//@flow
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

type Props = {
  path: string,
}

class BlogNavHeader extends React.Component<Props> {
  render() {
    return (
      <>
        <List>
          <ListItem button key="Recent">
            <ListItemText>
              <a
                href="/allPosts/"
                className="blackLink"
                style={getSubMenuItemStyle(this.props.path, "/allPosts/")}
              >
                All Posts
              </a>
            </ListItemText>
          </ListItem>
          <ListItem button key="Archive">
            <ListItemText>
              <a
                href="/archive/"
                className="blackLink"
                style={getSubMenuItemStyle(this.props.path, "/archive/")}
              >
                Archive
              </a>
            </ListItemText>
          </ListItem>
        </List>
      </>
    )
  }
}

export default BlogNavHeader
