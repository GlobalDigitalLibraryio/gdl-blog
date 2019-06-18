import React from "react"
import Layout from "../components/layout"
import Dropdowns from "../components/dropdowns"
import Helmet from "react-helmet"
import "../styles/blog-listings.css"
import "../styles/layout-overide.css"
import { graphql } from "gatsby"

export function MakeFlatCategoireList(categories2d) {
  const flatcat = []
  var catlist
  for (catlist in categories2d) {
    var cat
    for (cat in categories2d[catlist]) {
      if (!flatcat.includes(categories2d[catlist][cat])) {
        flatcat.push(categories2d[catlist][cat])
      }
    }
  }
  return flatcat
}

export function findMonthsAndYearsOfPosts(dates) {
  const monthYears = []
  var i
  for (i in dates) {
    var exactDate = dates[i].split(" ")
    const monthYear = exactDate[0] + " " + exactDate[2]
    if (!monthYears.includes(monthYear)) monthYears.push(monthYear)
  }
  return monthYears
}

export function fiveRecentPosts(title) {
  const recentTitles = []
  var i
  for (i in title) {
    if (i > 5) return
    else recentTitles.push(title[i])
  }
  return recentTitles
}

export default function bp({ data }) {
  const categories2d = []
  const dates = []
  const titles = []
  data.allMarkdownRemark.edges.map(node => {
    categories2d.push(node.node.frontmatter.categories)
    dates.push(node.node.frontmatter.date)
    titles.push(node.node.frontmatter.title)
  })
  const archives = findMonthsAndYearsOfPosts(dates)
  const categories = MakeFlatCategoireList(categories2d)
  const recentTitles = fiveRecentPosts(titles)

  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout>
      <Helmet title="Global Digital Library - Blog" />{" "}
      <Dropdowns>
        {categories}
        {archives}
        {recentTitles}
      </Dropdowns>
      <div className="blog-posts">
        {" "}
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <div className="blog-post-preview" key={post.id}>
                {" "}
                <h2>
                  {" "}
                  <a href={post.frontmatter.path}>
                    {post.frontmatter.title}
                  </a>{" "}
                </h2>{" "}
                <h3>{post.frontmatter.date}</h3> <p>{post.excerpt}</p>{" "}
              </div>
            )
          })}{" "}
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            author
            path
            categories
          }
        }
      }
    }
  }
`
