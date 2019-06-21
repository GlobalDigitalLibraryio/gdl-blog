import React from "react"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Helmet from "react-helmet"
import "../styles/layout-overide.css"
import "../styles/blog-listings.css"
import { graphql } from "gatsby"
import BlogNav from "../components/blogNavigation"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"
const useStyles = makeStyles(theme => ({
  mainGrid: {
    margin: theme.spacing(3),
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  blogPost: {
    width: "80%",
  },
}))
export default function bp({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const classes = useStyles()
  return (
    <Layout>
      <Helmet title="Global Digital Library - Blog" />
      <div className={classes.row}>
        {/*Main content */}
        <div className={classes.blogPost}>
          {" "}
          {posts.map(({ node: post }) => {
            return (
              <div className="blog-post-preview" key={post.id}>
                {" "}
                <h1>
                  {" "}
                  <a href={kebabCase(post.frontmatter.title)}>
                    {post.frontmatter.title}
                  </a>{" "}
                </h1>{" "}
                <h3>{post.frontmatter.date}</h3>{" "}
                {/*<div dangerouslySetInnerHTML={{ __html: post.html }}></div>{" "} */}
                {post.excerpt}
              </div>
            )
          })}{" "}
        </div>
        {/*end main content*/}

        <Hidden smDown>
          <BlogNav>{classes}</BlogNav>
        </Hidden>
      </div>
    </Layout>
  )
}
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          html
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            author
            categories
          }
        }
      }
    }
  }
`
