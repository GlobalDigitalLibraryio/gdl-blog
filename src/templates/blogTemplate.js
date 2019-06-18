import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import Dropdowns from "../components/dropdowns"
import {
  MakeFlatCategoireList,
  findMonthsAndYearsOfPosts,
  fiveRecentPosts,
} from "../pages/index"

export default function Template({ data }) {
  const post = data.markdownRemark
  const categories2d = []
  const dates = []
  const allPosts = []
  data.allMarkdownRemark.edges.map(node => {
    categories2d.push(node.node.frontmatter.categories)
    dates.push(node.node.frontmatter.date)
    allPosts.push(node.node.frontmatter.title)
  })

  var categories = MakeFlatCategoireList(categories2d)
  var archives = findMonthsAndYearsOfPosts(dates)
  var recentPosts = fiveRecentPosts(allPosts)

  return (
    <Layout className="blog-post-container">
      <Dropdowns>
        {categories}
        {archives}
        {recentPosts}
      </Dropdowns>
      <div>
        {" "}
        <Helmet title={post.frontmatter.title} />{" "}
        <div className="blog-post">
          {" "}
          <h2>{post.frontmatter.title}</h2>{" "}
          <h4>
            {post.frontmatter.date} by {post.frontmatter.author}
          </h4>
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />{" "}
        </div>{" "}
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        path
        categories
      }
    }
  }
`
