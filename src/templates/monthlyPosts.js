import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import BlogNav from "../components/blogNavSidebar"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"

import "../styles/blog-listings.css"
import { Divider } from "@material-ui/core"

function niceDate(uglyDate) {
  let a = uglyDate.split("-")
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
  ][a[1] - 1]
  return month + " " + a[0]
}

export default function Template({ pageContext, data }) {
  const { thisDate } = pageContext
  const { edges: posts, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } published in ${niceDate(thisDate)}:`

  const rowStyle = {
    display: "flex",
    flexDirection: "row",
  }

  return (
    <Layout>
      <Helmet title="Global Digital Library - Blog" />
      <div style={rowStyle}>
        <div>
          <h1 className="infoHeader">{tagHeader}</h1>
          <Divider></Divider>
          {posts.map(({ node }) => {
            const { title, date } = node.frontmatter
            return (
              <div className="blog-posts" key={date}>
                {" "}
                <div className="blog-post-preview">
                  {" "}
                  <h1>
                    {" "}
                    <a className="blackLink" href={`/${kebabCase(title)}/`}>
                      {title}
                    </a>{" "}
                  </h1>{" "}
                  <h3>{date}</h3> <p>{node.excerpt}</p>{" "}
                </div>
              </div>
            )
          })}{" "}
        </div>

        <Hidden smDown>
          <BlogNav />
        </Hidden>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
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
