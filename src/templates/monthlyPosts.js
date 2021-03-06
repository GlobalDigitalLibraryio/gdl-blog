//@flow
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogNav from "../components/blogNavSidebar"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"

import "../styles/blog-listings.css"
import { Card } from "@material-ui/core"
import BackButton from "../components/backButton"

function niceDate(uglyDate: string) {
  let a: Array<string> = uglyDate.split("-")
  let monthNumb = Number(a[1])
  if (a.length === 1) return " the year " + a[0]
  let month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ][monthNumb - 1]
  return month + " " + a[0]
}

type node = {
  node: {
    excerpt: string,
    frontmatter: {
      title: string,
      date: string,
    },
  },
}

type Props = {
  data: {
    allMarkdownRemark: {
      totalCount: number,
      edges: Array<node>,
    },
  },
  pageContext: {
    thisDate: string,
    nextDate: string,
  },
}

export default class Template extends React.Component<Props> {
  render() {
    const { thisDate } = this.props.pageContext
    const { edges: posts, totalCount } = this.props.data.allMarkdownRemark
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } published in ${niceDate(thisDate)}:`

    const rowStyle = {
      display: "flex",
      flexDirection: "row",
    }

    return (
      <Layout>
        <div style={rowStyle}>
          <div>
            <h1 className="infoHeader">{tagHeader}</h1>

            {posts.map(({ node }) => {
              const { title, date } = node.frontmatter
              return (
                <Card
                  style={{ padding: "10px", marginBottom: "20px" }}
                  key={title}
                >
                  <div className="blog-posts">
                    <h1>
                      <a
                        className="blackLink"
                        href={`/${kebabCase(date)}-${kebabCase(title)}/`}
                      >
                        {title}
                      </a>
                    </h1>
                    <h3>{date}</h3> <p>{node.excerpt}</p>
                  </div>
                </Card>
              )
            })}
            <div className="backAndLinkRow">
              <BackButton></BackButton>
              <a style={{ marginTop: "20px" }} href="/archive">
                Archives
              </a>
            </div>
          </div>

          <Hidden smDown>
            <BlogNav />
          </Hidden>
        </div>
      </Layout>
    )
  }
}

export const pageQuery: any = graphql`
  query($thisDate: Date, $nextDate: Date) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { gte: $thisDate, lte: $nextDate } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 250)
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
