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
  archive.forEach((arc, index) => {
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
}
const notHidden = {
  display: "block",
  paddingLeft: "10px",
}

let isHidden1 = hidden
let isHidden2 = hidden
let isHidden3 = hidden

function toggleHidden(i) {
  if (i === 1) {
    isHidden1 = isHidden1 === hidden ? notHidden : hidden
    return
  }
  if (i === 2) {
    isHidden2 = isHidden2 === hidden ? notHidden : hidden
    return
  }
  if (i === 3) {
    isHidden3 = isHidden3 === hidden ? notHidden : hidden
    return
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
            {pushToLists(data, categories2d, dates, titles)}
            <ListItem button key="Recent">
              <div style={colStyle}>
                <div onClick={() => toggleHidden(1)}>
                  <ListItemText>Recent Posts</ListItemText>
                </div>
                <div style={isHidden1}>
                  <SubMenu>
                    {titles.slice(0, 5)}
                    {everyListItemToKebabCase(titles.slice(0, 5))}
                  </SubMenu>
                </div>
              </div>
            </ListItem>

            <ListItem button key="Categories">
              <div style={colStyle}>
                <div onClick={() => toggleHidden(2)}>
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
                <div onClick={() => toggleHidden(3)}>
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
