import React from "react"
import { StaticQuery } from "gatsby"
import Grid from "@material-ui/core/Grid"
import { graphql } from "gatsby"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import { kebabCase } from "./kebabCase"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
// import CategoryCard from "../components/categoriesCard"
import ArchiveCard from "./archiveCard"

import "../styles/blog-listings.css"

const titles = []

function pushTitlesToList(data, titles) {
  if (titles.length === 0) {
    data.allMarkdownRemark.edges.forEach(node => {
      titles.push([node.node.frontmatter.title, node.node.frontmatter.date])
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
                date(formatString: "MMMM DD, YYYY")
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
                  {titles.slice(0, 5).map(rp => (
                    <Link
                      display="block"
                      variant="body1"
                      href={`/${kebabCase(rp[1])}-${kebabCase(rp[0])}/`}
                      key={rp[0]}
                      className="sidebarContent"
                      style={{ color: "#3c5a99" }}
                    >
                      {rp[0]}
                    </Link>
                  ))}
                  <Link
                    display="block"
                    variant="body1"
                    href="/allPosts/"
                    key="allPosts"
                    className="sidebarContent"
                    style={{ color: "#3c5a99" }}
                  >
                    <b>All posts...</b>
                  </Link>
                </Typography>
              </CardContent>
            </Card>
            {/** <CategoryCard>with more..</CategoryCard>*/}
            <ArchiveCard>with more.. </ArchiveCard>
          </Grid>
        </div>
      </>
    )}
  />
)

export default BlogNav
