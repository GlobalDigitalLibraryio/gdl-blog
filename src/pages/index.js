import React from "react"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Helmet from "react-helmet"
import "../styles/blog-listings.css"
import "../styles/layout-overide.css"
import { graphql } from "gatsby"
import BlogNav from "../components/blogNavigation"
import Hidden from "@material-ui/core/Hidden"

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
    width: "70%",
  },
}))

export default function bp({ data }) {
  const classes = useStyles()
  const { edges: posts } = data.allMarkdownRemark
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
                <h2>
                  {" "}
                  <a href={post.frontmatter.title}>
                    {post.frontmatter.title}
                  </a>{" "}
                </h2>{" "}
                <h3>{post.frontmatter.date}</h3> <p>{post.excerpt}</p>{" "}
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
