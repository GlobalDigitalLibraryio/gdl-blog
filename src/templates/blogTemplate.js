import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import Divider from "@material-ui/core/Divider"
import BlogNav from "../components/blogNavigation"
import { makeStyles } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"
import rehypeReact from "rehype-react"

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
  },
}))

const vid = link => {
  return (
    <div className="vidContainer">
      <iframe
        className="video"
        src={link.children[0].replace("watch?v=", "embed/")}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="noe her"
      />
    </div>
  )
}

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    video: vid,
  },
}).Compiler

export default function Template({ data }) {
  const classes = useStyles()
  const post = data.markdownRemark

  return (
    <Layout className="blog-post-container">
      <div className={classes.row}>
        {" "}
        <Helmet title={post.frontmatter.title} />{" "}
        <div className={classes.blogPost}>
          {" "}
          <h1>{post.frontmatter.title}</h1>{" "}
          <h4>
            {post.frontmatter.date} by {post.frontmatter.author}
          </h4>
          <div className="blog-post-content" />
          <div>{renderAst(post.htmlAst)}</div>
          <div>
            <b>posted in:</b>
            {post.frontmatter.categories.map(category => {
              function maybeComma() {
                if (
                  !post.frontmatter.categories.indexOf(category) + 1 ===
                  post.frontmatter.categories.length
                ) {
                  return ","
                }
              }
              return (
                <a
                  key={category}
                  href={
                    "/category/" + category.replace(/\s+/g, "-").toLowerCase()
                  }
                >
                  {category}
                  {maybeComma()}
                </a>
              )
            })}
          </div>
          <Divider></Divider>
        </div>{" "}
        <Hidden smDown>
          <BlogNav>{classes}</BlogNav>
        </Hidden>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      htmlAst
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
