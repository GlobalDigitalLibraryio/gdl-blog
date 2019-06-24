import React from "react"
import PropTypes from "prop-types"

// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import { kebabCase } from "../components/kebabCase"
import "../styles/blog-listings.css"

function TagsPage({
  data: {
    allMarkdownRemark: { group },
    site: {
      siteMetadata: { title },
    },
  },
}) {
  return (
    <Layout>
      <div>
        <Helmet title={title} />{" "}
        <div>
          <h1>Categories</h1>
          <ul>
            {group.map(tag => (
              <li key={tag.fieldValue}>
                <Link to={`/category/${kebabCase(tag.fieldValue)}/`}>
                  {tag.fieldValue} ({tag.totalCount})
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  )
}

TagsPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      group: PropTypes.arrayOf(
        PropTypes.shape({
          fieldValue: PropTypes.string.isRequired,
          totalCount: PropTypes.number.isRequired,
        }).isRequired
      ),
    }),
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
    }),
  }),
}

export default TagsPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
      edges {
        node {
          frontmatter {
            categories
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
