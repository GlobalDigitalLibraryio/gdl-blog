import React from "react"
import ListItemText from "@material-ui/core/ListItemText"

function getSubMenuItemStyle(ref, thisPath) {
  if (thisPath !== ref) {
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
function more(children) {
  if (children[3]) {
    return (
      <ListItemText key={"more"}>
        <a
          href={children[3]}
          style={getSubMenuItemStyle(`/${children[3]}/`, children[2])}
        >
          more..
        </a>
      </ListItemText>
    )
  }
}
export default function SubMenu({ children }) {
  const list = children[0]
  const slicedList = list.slice(0, 4)
  return (
    <>
      {slicedList.map((listItem, index) => {
        return (
          <ListItemText key={listItem}>
            <a
              href={`/${children[1][index]}/`}
              style={getSubMenuItemStyle(
                "/" + children[1][index] + "/",
                children[2]
              )}
            >
              {listItem}
            </a>
          </ListItemText>
        )
      })}
      {more(children)}
    </>
  )
}
