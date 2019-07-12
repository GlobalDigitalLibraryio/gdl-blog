//@flow
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Helmet from "react-helmet"
import BlogNav from "../components/blogNavSidebar"
import Hidden from "@material-ui/core/Hidden"
import rehypeReact from "rehype-react"
import BackButton from "../components/backButton"
import { Card } from "@material-ui/core"

type pq = {
  markdownRemark: {
    htmlAst: any,
    frontmatter: {
      date: string,
      title: string,
      author: string,
      categories: Array<string>,
    },
  },
}

export const videoTag = (link: { children: Array<String> }) => {
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

function maybeComma(cats: Array<string>, cat: string) {
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

type Props = {
  data: pq,
}
export default class Template extends React.Component<Props> {
  render() {
    const post = this.props.data.markdownRemark

    return (
      <Layout className="blog-post-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div>
            <Helmet title={post.frontmatter.title} />

            <div style={{ width: "100%" }} />
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
            <BlogNav />
          </Hidden>
        </div>
      </Layout>
    )
  }
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
