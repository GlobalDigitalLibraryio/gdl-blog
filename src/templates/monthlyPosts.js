import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import PropTypes from "prop-types"

import Helmet from "react-helmet"

const months = [
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
]

function niceDate(uglyDate) {
  let a = uglyDate.split("-")
  let month = months[a[1] - 1]
  return month + " " + a[0]
}

export default function Template({ pageContext, data }) {
  const { thisDate } = pageContext
  const { edges: posts, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } published in ${niceDate(thisDate)}`

  return (
    <Layout>
      <Helmet title="Global Digital Library - Blog" />{" "}
      <div>
        <h1>{tagHeader}</h1>
        {posts.map(({ node }) => {
          const { slug } = node.fields
          const { title, date } = node.frontmatter
          const { excerpt } = node
          return (
            <div className="blog-posts" key={slug}>
              {" "}
              <div className="blog-post-preview">
                {" "}
                <h2>
                  {" "}
                  <a href={slug}>{title}</a>{" "}
                </h2>{" "}
                <h3>{date}</h3> <p>{excerpt}</p>{" "}
              </div>
            </div>
          )
        })}{" "}
      </div>
    </Layout>
  )
}

/*
Template.propTypes = {
  pageContext: PropTypes.shape({
    year: PropTypes.string.isRequired,
  }),
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      totalCount: PropTypes.number.isRequired,
      edges: PropTypes.arrayOf(
        PropTypes.shape({
          node: PropTypes.shape({
            frontmatter: PropTypes.shape({
              title: PropTypes.string.isRequired,
            }),
            fields: PropTypes.shape({
              slug: PropTypes.string.isRequired,
            }),
          }),
        }).isRequired
      ),
    }),
  }),
}
*/
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
