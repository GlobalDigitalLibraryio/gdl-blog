import React from "react"
import ListItemText from "@material-ui/core/ListItemText"

export default function SubMenu({ children }) {
  const list = children[0]
  function getLink(listItem) {
    return children[1][list.indexOf(listItem)]
  }
  return (
    <>
      {list.map(listItem => (
        <ListItemText
          key={listItem}
          style={{ width: "inherit", paddingTop: "10px" }}
        >
          <a href={`/${getLink(listItem)}/`}>{listItem}</a>
        </ListItemText>
      ))}
    </>
  )
}
