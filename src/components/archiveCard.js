//@flow
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

type dateObject = {
  node: {
    frontmatter: {
      date: string,
    },
  },
}

function getDates(allEdges: Array<dateObject>) {
  allEdges.forEach(edge => {
    dates.push(edge.node.frontmatter.date)
  })
}
const colStyle = {
  display: "flex",
  flexDirection: "column",
}

function listArchiveWithMore(monthYears: Array<string>, more: boolean) {
  if (more) {
    const slicedList = monthYears.slice(0, 5)
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
    return listDates(monthYears)
  }
}

function listDates(dates: Array<string>) {
  return dates.map((archive, index) => (
    <Link
      display="block"
      variant="body1"
      href={`/${getArchiveLink(archive)}`}
      key={index}
      className="sidebarContent"
    >
      {archive}
    </Link>
  ))
}

type Props = {
  more: boolean,
}
type sq = {
  allMarkdownRemark: {
    edges: Array<dateObject>,
  },
}

class ArchiveCard extends React.Component<Props> {
  render() {
    return (
      <StaticQuery
        query={graphql`
          query {
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
        render={(data: sq) => (
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
                  {listArchiveWithMore(
                    findMonthsAndYearsOfPosts(dates),
                    this.props.more
                  )}
                  {}
                </Typography>
              </CardContent>
            </Card>
          </>
        )}
      />
    )
  }
}

export default ArchiveCard
