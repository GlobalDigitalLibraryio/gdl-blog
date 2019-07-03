import React from "react"
import { StaticQuery } from "gatsby"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { graphql } from "gatsby"
import Link from "@material-ui/core/Link"
import "../styles/blog-listings.css"
import {
  findMonthsAndYearsOfPosts,
  getArchiveLink,
} from "../components/commonBlogNav"

let dates = []
function getDates(allEdges) {
  allEdges.forEach(edge => {
    dates.push(edge.node.frontmatter.date)
  })
}
const colStyle = {
  display: "flex",
  flexDirection: "column",
}

function listArchiveWithMore(categories, more) {
  if (more) {
    const slicedList = categories.slice(0, 5)
    return (
      <>
        {listDates(slicedList)}
        <Link
          display="block"
          variant="body1"
          href="/archive/"
          className="sidebarContent"
        >
          <b>more...</b>
        </Link>
      </>
    )
  } else {
    return listDates(categories)
  }
}

function listDates(dates) {
  return dates.map(archive => (
    <Link
      display="block"
      variant="body1"
      href={`/${getArchiveLink(archive)}`}
      key={archive}
      className="sidebarContent"
    >
      {archive}
    </Link>
  ))
}

const ArchiveCard = ({ children }) => (
  <StaticQuery
    query={graphql`
      query hei {
        allMarkdownRemark(
          limit: 2000
          sort: { order: DESC, fields: [frontmatter___date] }
        ) {
          edges {
            node {
              frontmatter {
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => (
      <>
        {getDates(data.allMarkdownRemark.edges)}
        <Card className="Card">
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              className="sidebar"
              style={colStyle}
            >
              Archives
              {listArchiveWithMore(findMonthsAndYearsOfPosts(dates), children)}
              {}
            </Typography>
          </CardContent>
        </Card>
      </>
    )}
  />
)

export default ArchiveCard
