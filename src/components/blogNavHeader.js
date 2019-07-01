import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import SubMenu from "./subMenu"
import { StaticQuery } from "gatsby"
import { kebabCase } from "./kebabCase"
import {
  MakeFlatCategoireList,
  findMonthsAndYearsOfPosts,
  getArchiveLink,
  pushToLists,
} from "./commonBlogNav"

import ListItemText from "@material-ui/core/ListItemText"

const categories2d = []
const dates = []
const titles = []

function getArchiveLinks(archive) {
  const archiveLinks = []
  archive.forEach(arc => {
    archiveLinks.push(getArchiveLink(arc))
  })
  return archiveLinks
}

function getCatLink(categories) {
  const catLinks = []
  categories.forEach(cat => {
    catLinks.push("category/" + kebabCase(cat))
  })
  return catLinks
}

function everyListItemToKebabCase(list) {
  const kebabCaseList = []
  list.forEach(lItem => {
    kebabCaseList.push(kebabCase(lItem))
  })
  return kebabCaseList
}

const hidden = {
  display: "none",
  height: 0,
}
const notHidden = {
  display: "block",
  height: "auto",
  paddingLeft: "30px",
  paddingRight: "10px",
  maxWidth: "200px",
}
const closed = {
  backgroundColor: "inherit",
}
const open = {
  backgroundColor: "rgba(0, 0, 0, 0.20)",
}

let isOpen1 = closed
let isOpen2 = closed
let isOpen3 = closed

let isHidden1 = hidden
let isHidden2 = hidden
let isHidden3 = hidden

function toggleHidden(i) {
  if (i === 1) {
    isHidden1 = isHidden1 === hidden ? notHidden : hidden
    isOpen1 = isOpen1 === closed ? open : closed
    return
  }
  if (i === 2) {
    isHidden2 = isHidden2 === hidden ? notHidden : hidden
    isOpen2 = isOpen2 === closed ? open : closed
    return
  }
  if (i === 3) {
    isHidden3 = isHidden3 === hidden ? notHidden : hidden
    isOpen3 = isOpen3 === closed ? open : closed
    return
  }
}

function BlogNavHeader({ children }) {
  return (
    <StaticQuery
      query={blogNavQuery}
      render={data => (
        <>
          <List>
            {pushToLists(data, categories2d, dates, titles)}
            <ListItem
              button
              key="Recent"
              onClick={() => toggleHidden(1)}
              style={isOpen1}
            >
              <ListItemText>Recent Posts</ListItemText>
            </ListItem>
            <div style={isHidden1}>
              <SubMenu>
                {titles.slice(0, 5)}
                {everyListItemToKebabCase(titles.slice(0, 5))}
                {children}
              </SubMenu>
            </div>

            <ListItem
              button
              key="Categories"
              onClick={() => toggleHidden(2)}
              style={isOpen2}
            >
              <ListItemText>Categories</ListItemText>
            </ListItem>
            <div style={isHidden2}>
              <SubMenu>
                {MakeFlatCategoireList(categories2d)}
                {getCatLink(MakeFlatCategoireList(categories2d))}
                {children}
              </SubMenu>
            </div>

            <ListItem
              button
              key="Archive"
              onClick={() => toggleHidden(3)}
              style={isOpen3}
            >
              <ListItemText>Archive</ListItemText>
            </ListItem>
            <div style={isHidden3}>
              <SubMenu>
                {findMonthsAndYearsOfPosts(dates)}
                {getArchiveLinks(findMonthsAndYearsOfPosts(dates))}
                {children}
              </SubMenu>
            </div>
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
