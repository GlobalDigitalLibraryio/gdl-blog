//@flow
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import BlogNav from "../components/blogNavSidebar"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"
import { Card } from "@material-ui/core"
import BackButton from "../components/backButton"

type node = {
  node: {
    id: string,
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
    tag: string,
  },
}

const rowStyle = {
  display: "flex",
  flexDirection: "row",
}

class Tags extends React.Component<Props> {
  render() {
    const { tag } = this.props.pageContext
    const { edges, totalCount } = this.props.data.allMarkdownRemark
    const tagHeader = `Category: ${tag} (${totalCount})`
    return (
      <Layout>
        <div style={rowStyle}>
          <div>
            <h1 className="infoHeader">{tagHeader}</h1>

            {edges.map(post => {
              const { title, date } = post.node.frontmatter
              const { excerpt } = post.node
              const pageLink =
                "/" + kebabCase(date) + "-" + kebabCase(title) + "/"
              return (
                <Card
                  style={{ padding: "20px", marginBottom: "20px" }}
                  key={title}
                >
                  <div className="blog-posts">
                    <div>
                      <h1>
                        <a className="blackLink" href={pageLink}>
                          {title}
                        </a>
                      </h1>
                      <h3>{date}</h3> <p>{excerpt}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
            <div className="backAndLinkRow">
              <BackButton></BackButton>
              <a style={{ marginTop: "20px" }} href="/categories">
                All categories
              </a>
            </div>
          </div>

          <Hidden smDown>
            <BlogNav></BlogNav>
          </Hidden>
        </div>
      </Layout>
    )
  }
}

export default Tags

export const pageQuery = graphql`
  query($tag: String) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          id
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
