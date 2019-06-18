import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"

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
  const name = children[0]
  const list = children[1]

  const [anchorEl, setAnchorEl] = React.useState(null)
  const styles = useStyles()

  function handleClick(event) {
    setAnchorEl(event.currentTarget)
  }
  function handleClose() {
    setAnchorEl(null)
  }
  function getLink(listItem) {
    if (children.length > 2) return children[2][list.indexOf(listItem)]
    else return listItem.replace(/\s+/g, "-").toLowerCase()
  }
  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {
          <a variant="body2" to="/" className={styles.toolbarLink}>
            {name}
          </a>
        }
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {list.map(listItem => (
          <MenuItem key={listItem} onClick={handleClose}>
            <a href={`/${getLink(listItem)}/`}>{listItem}</a>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}
