//@flow
import React from "react"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import "../styles/blog-listings.css"
import { graphql } from "gatsby"
import BlogNav from "../components/blogNavSidebar"
import Hidden from "@material-ui/core/Hidden"
import { kebabCase } from "../components/kebabCase"
import BackButton from "../components/backButton"
import { Card, Divider } from "@material-ui/core"

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
}
type node = {
  node: {
    excerpt: string,
    frontmatter: {
      title: string,
      date: string,
      author: string,
    },
  },
}
type pqData = {
  allMarkdownRemark: {
    edges: Array<node>,
  },
}

// Variables used to navigate between sides of posts
const SIDES_PER_PAGE = 10
const allPosts = []
let sliceFrom = 0
let sliceTo = SIDES_PER_PAGE

function getAll(posts: Array<node>) {
  if (allPosts.length > 0) return
  posts.forEach(post => {
    allPosts.push(
      <Card
        key={post.node.frontmatter.title}
        style={{ padding: "10px", marginBottom: "20px" }}
      >
        <h1>
          <a
            className="blackLink"
            href={`/${kebabCase(post.node.frontmatter.date)}-${kebabCase(
              post.node.frontmatter.title
            )}`}
          >
            {post.node.frontmatter.title}
          </a>
        </h1>
        <h3>{post.node.frontmatter.date}</h3>{" "}
        <div dangerouslySetInnerHTML={{ __html: post.node.excerpt }}></div>
      </Card>
    )
  })
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
    <a href="/allPosts">
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
    <a href="/allPosts">
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

export default class bp extends React.Component<{ data: pqData }> {
  render() {
    return (
      <Layout>
        {getAll(this.props.data.allMarkdownRemark.edges)}
        <Helmet title="Global Digital Library - All posts" />

        <div style={rowStyle}>
          {/*Main content */}
          <div>
            <h1 className="infoHeader">All Blog Posts</h1>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                marginBottom: "20px",
              }}
            >
              <div>{allPosts.slice(sliceFrom, sliceTo)}</div>
              <div style={rowStyle}>{navigationControllers()}</div>
            </div>
            <Divider />
            <BackButton />
          </div>
          {/*end main content*/}
          <Hidden smDown>
            <BlogNav />
          </Hidden>
        </div>
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query IndexQuery2 {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
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
