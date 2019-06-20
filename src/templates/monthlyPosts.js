import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { makeStyles } from "@material-ui/core/styles"
import Helmet from "react-helmet"
import BlogNav from "../components/blogNavigation"
import Hidden from "@material-ui/core/Hidden"

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

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
function niceDate(uglyDate) {
  let a = uglyDate.split("-")
  if (a.length === 1) return " the year " + a[0]
  let month = months[a[1] - 1]
  return month + " " + a[0]
}

export default function Template({ pageContext, data }) {
  const classes = useStyles()
  const { thisDate } = pageContext
  const { edges: posts, totalCount } = data.allMarkdownRemark
  const tagHeader = `${totalCount} post${
    totalCount === 1 ? "" : "s"
  } published in ${niceDate(thisDate)}:`

  var rowStyle = {
    display: "flex",
    flexDirection: "row",
  }
  var infoFont = {
    fontWeight: "400",
    fontSize: "20px",
  }
  return (
    <Layout>
      <Helmet title="Global Digital Library - Blog" />
      <div style={rowStyle}>
        <div>
          <h1 style={infoFont}>{tagHeader}</h1>
          {posts.map(({ node }) => {
            const { slug } = node.fields
            const { title, date } = node.frontmatter
            const { excerpt } = node
            const pageLink = "/" + title + "/"
            return (
              <div className="blog-posts" key={slug}>
                {" "}
                <div className="blog-post-preview">
                  {" "}
                  <h1>
                    {" "}
                    <a href={pageLink}>{title}</a>{" "}
                  </h1>{" "}
                  <h3>{date}</h3> <p>{excerpt}</p>{" "}
                </div>
              </div>
            )
          })}{" "}
        </div>

        <Hidden smDown>
          <BlogNav>{classes}</BlogNav>
        </Hidden>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($thisDate: Date, $nextDate: Date) {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { date: { gte: $thisDate, lte: $nextDate } } }
    ) {
      totalCount
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
