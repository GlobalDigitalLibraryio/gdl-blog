import React from "react"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"

import ListItemText from "@material-ui/core/ListItemText"

function getSubMenuItemStyle(ref, thisPath) {
  if (thisPath === ref) {
    return {
      fontWeight: "bold",
      color: "black",
    }
  }
}

function BlogNavHeader({ children }) {
  return (
    <>
      <List>
        <ListItem button key="Recent">
          {" "}
          <ListItemText>
            <a
              href="/allPosts/"
              className="blackLink"
              style={getSubMenuItemStyle(children, "/allPosts/")}
            >
              All Posts
            </a>
          </ListItemText>
        </ListItem>
        <ListItem button key="Categories">
          <ListItemText>
            <a
              href="/categories/"
              className="blackLink"
              style={getSubMenuItemStyle(children, "/categories/")}
            >
              Categories
            </a>
          </ListItemText>
        </ListItem>
        <ListItem button key="Archive">
          {" "}
          <ListItemText>
            <a
              href="/archive/"
              className="blackLink"
              style={getSubMenuItemStyle(children, "/archive/")}
            >
              Archive
            </a>
          </ListItemText>
        </ListItem>
      </List>
    </>
  )
}

export default BlogNavHeader
