import React from "react"
import { StaticQuery } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { kebabCase } from "./kebabCase"
import {
  MakeFlatCategoireList,
  findMonthsAndYearsOfPosts,
  getArchiveLink,
  pushToLists,
} from "./commonBlogNav"

import "../styles/blog-listings.css"

const categories2d = []
const dates = []
const titles = []

const BlogNav = () => (
  <StaticQuery
    query={graphql`
      query blogNavQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                categories
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        {pushToLists(data, categories2d, dates, titles)}
        <div
          style={{
            margin: `0 auto`,
            maxWidth: "30%",
            minWidth: "30%",
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
            alignItems: "center",
          }}
        >
          {/* Sidebar */}
          <Grid item>
            <div className="sidebarWrapper">
              <Typography variant="h6" gutterBottom className="sidebar">
                Recent Posts
                {titles.slice(0, 5).map(rp => (
                  <Link
                    display="block"
                    variant="body1"
                    href={`/${kebabCase(rp)}/`}
                    key={rp}
                    className="sidebarContent"
                  >
                    {rp}
                  </Link>
                ))}
              </Typography>
            </div>
            <div className="sidebarWrapper">
              <Typography variant="h6" gutterBottom className="sidebar">
                Categories
                {MakeFlatCategoireList(categories2d).map(category => (
                  <Link
                    display="block"
                    variant="body1"
                    href={`/category/${kebabCase(category)}`}
                    key={category}
                    className="sidebarContent"
                  >
                    {category}
                  </Link>
                ))}
              </Typography>
            </div>
            <div className="sidebarWrapper">
              <Typography variant="h6" gutterBottom className="sidebar">
                Archives
                {findMonthsAndYearsOfPosts(dates).map(archive => (
                  <Link
                    display="block"
                    variant="body1"
                    href={`/${getArchiveLink(archive)}`}
                    key={archive}
                    className="sidebarContent"
                  >
                    {archive}
                  </Link>
                ))}
              </Typography>
            </div>
          </Grid>
        </div>
      </>
    )}
  />
)

export default BlogNav
