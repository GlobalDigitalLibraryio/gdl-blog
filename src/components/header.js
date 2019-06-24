import { Link } from "gatsby"
import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import Toolbar from "@material-ui/core/Toolbar"
import gdlLogo from "../images/gdl-logo.svg"
import Hidden from "@material-ui/core/Hidden"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Button from "@material-ui/core/Button"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import drawerIcon from "../images/menuIcon.png"
import BlogNavHeader from "./blogNavHeader"

const menuItmens = [
  ["Home", "https://home.digitallibrary.io/about/"],
  ["Blog", "/"],
  ["About", "https://home.digitallibrary.io/about/"],
  ["Contact", "https://home.digitallibrary.io/contact/"],
  ["GDL in the news", "https://home.digitallibrary.io/gdl-in-the-news/"],
]

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: "white",
    fontSize: "20px",
  },
  toolbarLinkActive: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: "white",
    fontSize: "20px",
    textDecoration: "underline",
  },
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}))
const logoImg = classes => {
  return (
    <Typography
      component="h2"
      variant="h5"
      align="left"
      className={classes.toolbarTitle}
    >
      <Link to="/" aria-label="Global Digital Library">
        <img src={gdlLogo} aria-hidden alt="gdlLogo" />
      </Link>
    </Typography>
  )
}
function createMenuItem(menuItem, classes) {
  if (menuItem[1] === "/") {
    return (
      <a
        key={menuItem[0]}
        variant="body2"
        href={menuItem[1]}
        className={classes.toolbarLinkActive}
      >
        {menuItem[0]}
      </a>
    )
  } else {
    return (
      <a
        key={menuItem[0]}
        variant="body2"
        href={menuItem[1]}
        className={classes.toolbarLink}
      >
        {menuItem[0]}
      </a>
    )
  }
}
const bigHeader = classes => {
  return (
    <Toolbar className={classes.toolbar}>
      {logoImg(classes)}
      {menuItmens.map(menuItem => createMenuItem(menuItem, classes))}
      <Divider />
    </Toolbar>
  )
}

const sideList = (side, classes, state, setState) => (
  <div
    className={classes.list}
    role="presentation"
    onClick={toggleDrawer(side, false, state, setState)}
    onKeyDown={toggleDrawer(side, false, state, setState)}
  >
    <List>
      {menuItmens.map(text => (
        <ListItem button key={text[0]}>
          <a href={text[1]}>
            <ListItemText primary={text[0]} />
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

const smallImg = {
  width: "50%",
}

function smalHeader(classes, state, setState) {
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Button onClick={toggleDrawer("left", true, state, setState)}>
          <img src={drawerIcon} alt="draweIcon" style={smallImg}></img>
        </Button>
        {logoImg(classes)}
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer("left", false, state, setState)}
          onOpen={toggleDrawer("left", true, state, setState)}
        >
          {sideList(" ", classes, state, setState)}
        </SwipeableDrawer>
      </Toolbar>
    </div>
  )
}

function Header() {
  const [state, setState] = React.useState({
    left: false,
  })
  const classes = useStyles()
  return (
    <>
      <header
        id="header"
        style={{
          background: `#0277BD`,
          font: "112.5%/1.45em arial",
        }}
      >
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
          }}
        >
          <Hidden mdUp>{smalHeader(classes, state, setState)}</Hidden>
          <Hidden smDown>{bigHeader(classes)}</Hidden>
        </div>
      </header>
    </>
  )
}

export default Header
