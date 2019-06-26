import React from "react"
import { AppBar, Hidden } from "@material-ui/core"
import { Link } from "gatsby"
import gdlLogo from "../images/gdl-logo.svg"
import { makeStyles } from "@material-ui/core/styles"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import MenuIcon from "@material-ui/icons/Menu"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import BlogNavHeader from "./blogNavHeader"

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
const menuItmens = [
  ["Home", "https://home.digitallibrary.io/about/"],
  ["Blog", "/"],
  ["About", "https://home.digitallibrary.io/about/"],
  ["Contact", "https://home.digitallibrary.io/contact/"],
  ["GDL in the news", "https://home.digitallibrary.io/gdl-in-the-news/"],
]

const menuItemStyle = {
  padding: "8px",
  flexshrink: 0,
  color: "white",
  fontSizze: "20px",
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
const sideList = (side, state, setState) => (
  <div
    style={{ widh: 250 }}
    onClick={toggleDrawer(side, false, state, setState)}
    onKeyDown={toggleDrawer(side, false, state, setState)}
  >
    <List>
      {menuItmens.map((text, index) => (
        <ListItem button key={text[0]}>
          <a href={text[1]}>
            <ListItemText id="menuItem" primary={text[0]} />
          </a>
        </ListItem>
      ))}
    </List>
    <Divider />
    <BlogNavHeader />
  </div>
)

const toggleDrawer = (side, open, state, setState) => event => {
  if (
    event &&
    event.type === "keydown" &&
    (event.key === "Tab" || event.key === "Shift")
  ) {
    return
  }
  setState({ ...state, [side]: open })
}

export default function Header() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false,
  })

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#0277bd" }}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={toggleDrawer("left", true, state, setState)}
            >
              <MenuIcon />
            </IconButton>
            <SwipeableDrawer
              open={state.left}
              onClose={toggleDrawer("left", false, state, setState)}
              onOpen={toggleDrawer("left", true, state, setState)}
            >
              {sideList(" ", state, setState)}
            </SwipeableDrawer>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" aria-label="Global Digital Library">
              <img src={gdlLogo} aria-hidden alt="logo" />
            </Link>
          </Typography>
          <Hidden smDown>
            {menuItmens.map((menuItem, index) => {
              return (
                <Button href={menuItem[1]} key={index} style={menuItemStyle}>
                  {menuItem[0]}
                </Button>
              )
            })}
          </Hidden>
        </Toolbar>
      </AppBar>
    </div>
  )
}
