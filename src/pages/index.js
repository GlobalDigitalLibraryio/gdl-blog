import React from "react"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Helmet from "react-helmet"
import "../styles/blog-listings.css"
import { graphql } from "gatsby"
import BlogNav from "../components/blogNavSidebar"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"
import { renderAst } from "../templates/blogTemplate"

const useStyles = makeStyles(theme => ({
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  blogPost: {
    width: "90%",
    display: "flex",
    flexDirection: "column-reverse",
    justifyContent: "flex-end",
  },
}))

// Variables used to navigate between sides of posts
const SIDES_PER_PAGE = 5
const allPosts = []
let sliceFrom = 0
let sliceTo = SIDES_PER_PAGE

function getAll(posts) {
  if (allPosts.length > 0) return
  posts.forEach(({ node: post }) => {
    allPosts.push(
      <div className="blog-post-preview" key={post.id}>
        <h1>
          <a className="blackLink" href={kebabCase(post.frontmatter.title)}>
            {post.frontmatter.title}
          </a>
        </h1>
        <h3>{post.frontmatter.date}</h3> <div>{renderAst(post.htmlAst)}</div>
      </div>
    )
  })
}

/** We get the posts we want to show on the index page */
function getSelectedPosts() {
  return allPosts.slice(sliceFrom, sliceTo)
}

/** When we want to see older posts we update the variables that controls which posts are visible */
function getOlderPosts() {
  if (sliceTo >= allPosts.length) return
  else {
    sliceFrom = sliceTo
    sliceTo = Math.min(sliceTo + SIDES_PER_PAGE, allPosts.length)
  }
}

/** When we want to see newer posts we update the variables that controls which posts are visible */
function getNewerPosts() {
  if (sliceFrom <= 0) return
  else {
    sliceTo = sliceFrom
    sliceFrom = Math.max(sliceTo - SIDES_PER_PAGE, 0)
  }
}

/** sets the style of older-button if its no older posts */
function olderButtonVisible() {
  let style
  if (sliceTo >= allPosts.length) {
    style = "unavailable"
  }
  return (
    <a href="/">
      <div onClick={() => getOlderPosts()}>
        <b className="blackLink" id={style}>
          Older posts
        </b>
      </div>
    </a>
  )
}
/** sets the style of newer-button if its no newer posts */
function newerButtonVisible() {
  let style
  if (sliceFrom <= 0) {
    style = "unavailable"
  }
  return (
    <a href="/">
      <div onClick={() => getNewerPosts()}>
        <b className="blackLink" id={style}>
          Newer posts{" "}
        </b>
      </div>
    </a>
  )
}

function navigationControllers() {
  return (
    <>
      <div>{newerButtonVisible()}</div>
      <div>
        {/*Shows which page we´re on and when  */}
        {Math.ceil(sliceTo / SIDES_PER_PAGE)} /{" "}
        {Math.ceil(allPosts.length / SIDES_PER_PAGE)}
      </div>
      <div>{olderButtonVisible()}</div>
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
          <div className={classes.row}>{navigationControllers()}</div>
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
          }
        }
      }
    }
  }
`
