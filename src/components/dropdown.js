import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import MenuItem from "@material-ui/core/MenuItem"
import ListItemText from "@material-ui/core/ListItemText"

const useStyles = makeStyles(theme => ({
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    flexShrink: 0,
  },
}))

export default function Dropdown({ children }) {
  const classes = useStyles()
  const name = children[0]
  const list = children[1]

  function getLink(listItem) {
    if (children.length > 2) {
      return children[2][list.indexOf(listItem)]
    } else return listItem
  }
  return (
    <div>
      <div key="RECENT">
        {
          <a variant="body2" href="#" className={classes.toolbarLink}>
            <ListItemText>{name}</ListItemText>
          </a>
        }
      </div>
      <div id="Proverr">
        {list.map(listItem => (
          <MenuItem key={`/${getLink(listItem)}/`}>
            <a href={`/${getLink(listItem)}/`}>{listItem}</a>
          </MenuItem>
        ))}
      </div>
    </div>
  )
}
