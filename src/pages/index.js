import React from "react"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Helmet from "react-helmet"
import "../styles/blog-listings.css"
import { graphql } from "gatsby"
import BlogNav from "../components/blogNavigation"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"
import { renderAst } from "../templates/blogTemplate"

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
    justifyContent: "space-around",
  },
  blogPost: {
    width: "80%",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
  },
}))
const SIDES_PER_PAGE = 5
var allPosts = []
var sliceFrom = 0
var sliceTo = SIDES_PER_PAGE
var getAllPostsOnlyOnce = 0

function getAll(posts) {
  if (getAllPostsOnlyOnce !== 0) return
  getAllPostsOnlyOnce += 1
  posts.forEach(({ node: post }) => {
    allPosts.push(
      <div className="blog-post-preview" key={post.id}>
        {" "}
        <h1>
          <a href={kebabCase(post.frontmatter.title)}>
            {post.frontmatter.title}
          </a>{" "}
        </h1>{" "}
        <h3>{post.frontmatter.date}</h3> <div>{renderAst(post.htmlAst)}</div>
      </div>
    )
  })
}
function getSelectedPosts() {
  return allPosts.slice(sliceFrom, sliceTo)
}
function getOlderPosts() {
  sliceFrom = sliceTo
  sliceTo = Math.min(sliceTo + SIDES_PER_PAGE, allPosts.length)
}
function getNewerPosts() {
  sliceTo = sliceFrom
  sliceFrom = Math.max(sliceTo - SIDES_PER_PAGE, 0)
}

function olderButtonVisible() {
  if (sliceTo >= allPosts.length) return ""
  else {
    return (
      <a href="/">
        <div className="arrow arrow--right" onClick={() => getOlderPosts()}>
          <b> Older posts</b>
        </div>
      </a>
    )
  }
}
function newerButtonVisible() {
  if (sliceFrom <= 0) return ""
  else {
    return (
      <a href="/">
        <div className="arrow arrow--left" onClick={() => getNewerPosts()}>
          <b>Newer posts </b>
        </div>
      </a>
    )
  }
}

function navigationArrows() {
  return (
    <>
      {newerButtonVisible()}
      {Math.ceil(sliceTo / SIDES_PER_PAGE)} /{" "}
      {Math.ceil(allPosts.length / SIDES_PER_PAGE)}
      {olderButtonVisible()}
    </>
  )
}
export default function bp({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  const classes = useStyles()

  return (
    <Layout>
      {getAll(posts)}
      <Helmet title="Global Digital Library - Blog" />
      <div className={classes.row}>
        {/*Main content */}
        <div className={classes.blogPost}>
          <div className={classes.row}>{navigationArrows()}</div>
          <div>{getSelectedPosts()}</div>
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
          htmlAst
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
