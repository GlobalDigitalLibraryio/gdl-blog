import React from "react"
import PropTypes from "prop-types"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

const Tags = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { edges, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } with the category "${tag}"`

  return (
    <Layout>
      <div>
        <h1>{tagHeader}</h1>
        <ul>
          {edges.map(({ node }) => {
            const { title, date } = node.frontmatter
            const { excerpt } = node
            const pageLink = "/" + title + "/"
            return (
              <div className="blog-posts" key={title}>
                {" "}
                <div className="blog-post-preview">
                  {" "}
                  <h2>
                    {" "}
                    <a href={pageLink}>{title}</a>{" "}
                  </h2>{" "}
                  <h3>{date}</h3> <p>{excerpt}</p>{" "}
                </div>
              </div>
            )
          })}
        </ul>
        <Link to="/categories">All categories</Link>
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
