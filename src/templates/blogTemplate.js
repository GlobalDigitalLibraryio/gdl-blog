import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import BlogNav from "../components/blogNavSidebar"
import { makeStyles } from "@material-ui/core/styles"
import Hidden from "@material-ui/core/Hidden"
import rehypeReact from "rehype-react"
import BackButton from "../components/backButton"
import { Card } from "@material-ui/core"

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
    width: "100%",
  },
}))

export const videoTag = link => {
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

export const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    video: videoTag,
  },
}).Compiler

function maybeComma(cats, cat) {
  if (!cats.indexOf(cat) + 1 === cats.length) {
    return ","
  }
}

function getCategoryString(cats) {
  if (cats === null) return "uncategorized"
  const categories = []
  cats.forEach(category => {
    categories.push(
      <a
        key={category}
        href={"/category/" + category.replace(/\s+/g, "-").toLowerCase()}
      >
        {category}
        {maybeComma(cats, category)}{" "}
      </a>
    )
  })
  return (
    <>
      <b>posted in:</b>
      {categories}
    </>
  )
}

export default function Template({ data }) {
  const classes = useStyles()
  const post = data.markdownRemark

  return (
    <Layout className="blog-post-container">
      <div className={classes.row}>
        <Helmet title={post.frontmatter.title} />

        <div className={classes.blogPost}>
          <Card style={{ marginTop: "20px", padding: "20px", paddingTop: 0 }}>
            <h1>{post.frontmatter.title}</h1>{" "}
            <h3>
              {post.frontmatter.date} by {post.frontmatter.author}
            </h3>
            <div className="blog-post-content" />
            <div>{renderAst(post.htmlAst)}</div>
            <div style={{ paddingTop: "20px" }}>
              {getCategoryString(post.frontmatter.categories)}
            </div>
          </Card>
          <BackButton />
        </div>

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
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        author
        categories
      }
    }
  }
`
