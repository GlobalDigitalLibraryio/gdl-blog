import React from "react"
import { StaticQuery } from "gatsby"
import Grid from "@material-ui/core/Grid"
import "../styles/blog-listings.css"
import "../styles/layout-overide.css"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { kebabCase } from "./kebabCase"
import {
  MakeFlatCategoireList,
  findMonthsAndYearsOfPosts,
  fiveRecentPosts,
} from "./blogNavHeader"

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

const categories2d = []
const dates = []
const titles = []

function archiveLinks(archiveDate) {
  let a = archiveDate.split(" ")
  let month = months.indexOf(a[0]) + 1
  if (month < 10) month = "0" + month
  return "/" + a[1] + "/" + month

  //fin linker fra dato og returner den linken
}

const pushToLists = data => {
  if (categories2d.length === 0) {
    data.allMarkdownRemark.edges.map(node => {
      categories2d.push(node.node.frontmatter.categories)
      dates.push(node.node.frontmatter.date)
      titles.push(node.node.frontmatter.title)
    })
  }
  return
}
const BlogNav = ({ children }) => (
  <StaticQuery
    query={graphql`
      query blogNavQuery {
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
    `}
    render={data => (
      <>
        {pushToLists(data)}
        <div
          style={{
            margin: `0 auto`,
            maxWidth: "20%",
            minWidth: "20%",
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            alignItems: "center",
          }}
        >
          {/* Sidebar */}
          <Grid item>
            <Typography
              variant="h6"
              gutterBottom
              className={children.sidebarSection}
            >
              Recent Posts
            </Typography>
            {fiveRecentPosts(titles).map(rp => (
              <Link
                display="block"
                variant="body1"
                href={`/${kebabCase(rp)}/`}
                key={rp + 1}
              >
                {rp}
              </Link>
            ))}
            <Typography
              variant="h6"
              gutterBottom
              className={children.sidebarSection}
            >
              Categories
            </Typography>
            {MakeFlatCategoireList(categories2d).map(category => (
              <Link
                display="block"
                variant="body1"
                href={`/category/${kebabCase(category)}`}
                key={category}
              >
                {category}
              </Link>
            ))}
            <Typography
              variant="h6"
              gutterBottom
              className={children.sidebarSection}
            >
              Archives
            </Typography>
            {findMonthsAndYearsOfPosts(dates).map(archive => (
              <Link
                display="block"
                variant="body1"
                href={archiveLinks(archive)}
                key={archive}
              >
                {archive}
              </Link>
            ))}
          </Grid>
        </div>
      </>
    )}
  />
)

export default BlogNav
