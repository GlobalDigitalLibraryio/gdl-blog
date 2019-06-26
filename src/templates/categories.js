import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import BlogNav from "../components/blogNavSidebar"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } with the category "${tag}":`

  var rowStyle = {
    display: "flex",
    flexDirection: "row",
  }
  var infoFont = {
    fontWeight: "400",
    fontSize: "20px",
  }

  return (
    <Layout>
      <div style={rowStyle}>
        <div>
          <h1 style={infoFont}>{tagHeader}</h1>
          {edges.map(({ node }) => {
            const { title, date } = node.frontmatter
            const { excerpt } = node
            const pageLink = "/" + kebabCase(title) + "/"
            return (
              <div className="blog-posts" key={title}>
                {" "}
                <div className="blog-post-preview">
                  {" "}
                  <h1>
                    {" "}
                    <a href={pageLink}>{title}</a>{" "}
                  </h1>{" "}
                  <h3>{date}</h3> <p>{excerpt}</p>{" "}
                </div>
              </div>
            )
          })}
          <Link to="/categories">All categories</Link>
        </div>

        <Hidden smDown>
          <BlogNav></BlogNav>
        </Hidden>
      </div>
    </Layout>
  )
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
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
