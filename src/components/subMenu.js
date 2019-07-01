import React from "react"
import ListItemText from "@material-ui/core/ListItemText"

export default function SubMenu({ children }) {
  const list = children[0]
  const thisPath = children[2]
  function getSubMenuItemStyle(index) {
    if (thisPath !== "/" + children[1][index] + "/") {
      return {
        width: "inherit",
        paddingTop: "10px",
        color: "black",
      }
    } else {
      return {
        width: "inherit",
        paddingTop: "10px",
        fontWeight: "bold",
        color: "black",
      }
    }
  }
  return (
    <>
      {list.map((listItem, index) => (
        <ListItemText key={listItem}>
          <a
            href={`/${children[1][index]}/`}
            style={getSubMenuItemStyle(index)}
          >
            {listItem}
          </a>
        </ListItemText>
      ))}
    </>
  )
}
