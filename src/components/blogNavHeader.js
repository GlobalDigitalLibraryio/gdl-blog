import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import Dropdown from "./dropdown"
import { StaticQuery } from "gatsby"
import { kebabCase } from "./kebabCase"

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
    data.allMarkdownRemark.edges.map(node => {
      categories2d.push(node.node.frontmatter.categories)
      dates.push(node.node.frontmatter.date)
      titles.push(node.node.frontmatter.title)
    })
  }
}
/*
var recentPosts
var recentPostsLink
var categoriesList
var categoryLinks
var archive
var archiveLinks


{(recentPosts = fiveRecentPosts(titles))}
{(recentPostsLink = getRecentPostLink(recentPosts))}
{(categoriesList = MakeFlatCategoireList(categories2d))}
{(categoryLinks = getCatLink(categoriesList))}
{(archive = findMonthsAndYearsOfPosts(dates))}
{(archiveLinks = getArchiveLinks(archive))}
*/
function BlogNavHeader() {
  return (
    <StaticQuery
      query={blogNavQuery}
      render={data => (
        <>
          <List>
            {pushToLists(data)}
            <ListItem button key="Recent">
              <Dropdown>
                Recent Posts
                {fiveRecentPosts(titles)}
                {getRecentPostLink(fiveRecentPosts(titles))}
              </Dropdown>
            </ListItem>
            <ListItem button key="Categories" href="/categories">
              <Dropdown>
                Categories
                {MakeFlatCategoireList(categories2d)}
                {getCatLink(MakeFlatCategoireList(categories2d))}
              </Dropdown>
            </ListItem>
            <ListItem button key="Archive">
              <Dropdown>
                Archive
                {findMonthsAndYearsOfPosts(dates)}
                {getArchiveLinks(findMonthsAndYearsOfPosts(dates))}
              </Dropdown>
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
