import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import SubMenu from "./subMenu"
import { StaticQuery } from "gatsby"
import { kebabCase } from "./kebabCase"

import ListItemText from "@material-ui/core/ListItemText"
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

export function MakeFlatCategoireList(categories2d) {
  const flatcat = []
  var catlist
  for (catlist in categories2d) {
    var cat
    for (cat in categories2d[catlist]) {
      if (!flatcat.includes(categories2d[catlist][cat])) {
        flatcat.push(categories2d[catlist][cat])
      }
    }
  }
  return flatcat
}

export function findMonthsAndYearsOfPosts(dates) {
  const monthYears = []
  var i
  for (i in dates) {
    var exactDate = dates[i].split(" ")
    const monthYear = exactDate[0] + " " + exactDate[2]
    if (!monthYears.includes(monthYear)) monthYears.push(monthYear)
  }
  return monthYears
}

export function fiveRecentPosts(title) {
  const recentTitles = []
  var i
  for (i in title) {
    if (i >= 5) return recentTitles
    else recentTitles.push(title[i])
  }
  return recentTitles
}

function getArchiveLinks(archive) {
  const archiveLinks = []
  var i
  for (i in archive) {
    let a = archive[i].split(" ")
    let month = months.indexOf(a[0]) + 1
    if (month < 10) month = "0" + month
    archiveLinks.push(a[1] + "/" + month)
  }
  return archiveLinks
}

function getCatLink(categories) {
  const categoryLinks = []
  var j
  for (j in categories) {
    categoryLinks.push("category/" + kebabCase(categories[j]))
  }
  return categoryLinks
}
function getRecentPostLink(posts) {
  const postLinks = []
  var i
  for (i in posts) {
    postLinks.push(kebabCase([posts[i]]))
  }
  return postLinks
}

function pushToLists(data) {
  if (titles.length === 0) {
    data.allMarkdownRemark.edges.forEach(node => {
      categories2d.push(node.node.frontmatter.categories)
      dates.push(node.node.frontmatter.date)
      titles.push(node.node.frontmatter.title)
    })
  }
}

const hidden = {
  display: "none",
}
const notHidden = {
  display: "block",
  paddingLeft: "10px",
}

var isHidden1 = hidden
var isHidden2 = hidden
var isHidden3 = hidden

function toggleHidden(i) {
  if (i === 1) {
    if (isHidden1 === hidden) {
      isHidden1 = notHidden
    } else {
      isHidden1 = hidden
    }
  } else if (i === 2) {
    if (isHidden2 === hidden) {
      isHidden2 = notHidden
    } else {
      isHidden2 = hidden
    }
  } else if (i === 3) {
    if (isHidden3 === hidden) {
      isHidden3 = notHidden
    } else {
      isHidden3 = hidden
    }
  }
}
const colStyle = {
  display: "flex",
  flexDirection: "column",
}

function BlogNavHeader() {
  return (
    <StaticQuery
      query={blogNavQuery}
      render={data => (
        <>
          <List>
            {pushToLists(data)}
            <ListItem button key="Recent">
              <div style={colStyle}>
                <div id="1" onClick={() => toggleHidden(1)}>
                  <ListItemText>Recent Posts</ListItemText>
                </div>

                <div style={isHidden1}>
                  <SubMenu style={isHidden1}>
                    {fiveRecentPosts(titles)}
                    {getRecentPostLink(fiveRecentPosts(titles))}
                  </SubMenu>
                </div>
              </div>
            </ListItem>

            <ListItem button key="Categories">
              <div style={colStyle}>
                <div id="2" onClick={() => toggleHidden(2)}>
                  <ListItemText>Categories</ListItemText>
                </div>

                <div style={isHidden2}>
                  <SubMenu>
                    {MakeFlatCategoireList(categories2d)}
                    {getCatLink(MakeFlatCategoireList(categories2d))}
                  </SubMenu>
                </div>
              </div>
            </ListItem>

            <ListItem button key="Archive">
              <div style={colStyle}>
                <div id="3" onClick={() => toggleHidden(3)}>
                  <ListItemText>Archive</ListItemText>
                </div>

                <div style={isHidden3}>
                  <SubMenu>
                    {findMonthsAndYearsOfPosts(dates)}
                    {getArchiveLinks(findMonthsAndYearsOfPosts(dates))}
                  </SubMenu>
                </div>
              </div>
            </ListItem>
          </List>
        </>
      )}
    />
  )
}

const blogNavQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            categories
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`

export default BlogNavHeader
