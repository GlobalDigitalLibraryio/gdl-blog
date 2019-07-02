import React from "react"
import { StaticQuery } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { kebabCase } from "./kebabCase"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CategoryCard from "../components/categoriesCard"
import ArchiveCard from "./archiveCard"

import "../styles/blog-listings.css"

const titles = []

function pushTitlesToList(data, titles) {
  if (titles.length === 0) {
    data.allMarkdownRemark.edges.forEach(node => {
      titles.push(node.node.frontmatter.title)
    })
  }
}

const BlogNav = () => (
  <StaticQuery
    query={graphql`
      query blogNavQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              frontmatter {
                title
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        {pushTitlesToList(data, titles)}
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
            <Card className="Card">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Recent Posts
                  {titles.slice(0, 5).map((rp, index) => (
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
                  <Link
                    display="block"
                    variant="body1"
                    href="/allPosts/"
                    key="allPosts"
                    className="sidebarContent"
                  >
                    <b>All posts...</b>
                  </Link>
                </Typography>
              </CardContent>
            </Card>
            <CategoryCard>with more..</CategoryCard>
            <ArchiveCard>with more.. </ArchiveCard>
          </Grid>
        </div>
      </>
    )}
  />
)

export default BlogNav
