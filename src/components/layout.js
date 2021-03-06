//@flow
import React from "react"
import Footer from "./footer/footer"
import { AppBar, Hidden } from "@material-ui/core"
import gdlLogo from "../images/gdl-logo.svg"
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
import { Location } from "@reach/router"
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer"
import Helmet from "react-helmet"
import "../styles/blog-posts.css"

const env = process.env.GATSBY_GDL_ENVIRONMENT || "development"

const HOME_URL = "https://home.digitallibrary.io"

const menuItems = [
  ["Home", HOME_URL],
  ["Blog", "/"],
  ["About", HOME_URL + "/about"],
  ["Contact", HOME_URL + "/contact"],
  ["GDL in the news", HOME_URL + "/gdl-in-the-news"],
]

const menuItemStyle = {
  color: "white",
}
const menuItemActive = {
  color: "white",
  textDecoration: "underline",
}

const sideList = (side, state, setState) => (
  <div
    onClick={toggleDrawer(side, false, state, setState)}
    onKeyDown={toggleDrawer(side, false, state, setState)}
  >
    <List>
      {menuItems.map(text => (
        <ListItem button key={text[0]}>
          <a href={text[1]} className="blackLink">
            <ListItemText id="menuItem" primary={text[0]} />
          </a>
        </ListItem>
      ))}
    </List>
    <Divider />
    <BlogNavHeader path={thisPath} />
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

let thisPath: string
let thisUrl: string

const Layout = ({ children }: any) => {
  const [state, setState] = React.useState({
    left: false,
  })

  return (
    <>
      <Location>
        {({ location }) => {
          thisPath = location.pathname
          thisUrl = location.href

          return (
            <Helmet
              title="Blog | Global Digital Library"
              htmlAttributes={{ prefix: "og: http://ogp.me/ns#" }}
            >
              <meta property="og:url" content={thisUrl} />
              <meta property="og:type" content="website" />
              <meta
                property="og:description"
                content="News, info and updates on the development of the Global Digital Library.
                  Read about experiences developing the GDL to date and be kept in the loop as it evolves."
              />
              <meta
                name="description"
                content="News, info and updates on the development of the Global Digital Library.
                  Read about experiences developing the GDL to date and be kept in the loop as it evolves."
              />
              <meta
                property="og:site_name"
                content="Blog | Global Digital Library"
              />
              <meta property="og:image" content={gdlLogo} />
              <meta name="twitter:card" content="summary" />
              <meta
                name="twitter:image:alt"
                content="Global Digital Library Logo"
              />
              <meta name="twitter:site" content="@GDigitalLibrary" />
            </Helmet>
          )
        }}
      </Location>
      <AppBar position="sticky" style={{ backgroundColor: "#3C5A99" }}>
        <Toolbar>
          <Hidden mdUp>
            <IconButton
              style={{ marginRight: "16px" }}
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
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <div
              aria-label="Global Digital Library"
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <img
                src={gdlLogo}
                style={{ width: "100px" }}
                aria-hidden
                alt="logo"
              />
            </div>
          </Typography>
          <Hidden smDown>
            <Button href={HOME_URL} key="Home" style={menuItemStyle}>
              Home
            </Button>
            <Button href="/" key="Blog" style={menuItemActive}>
              Blog
            </Button>
            <Button
              href={HOME_URL + "/about"}
              key="About"
              style={menuItemStyle}
            >
              About
            </Button>
            <Button
              href={HOME_URL + "/contact"}
              key="Contact"
              style={menuItemStyle}
            >
              Contact
            </Button>
            <Button
              href={HOME_URL + "/gdl-in-the-news"}
              key="gdl-in-the-news"
              style={menuItemStyle}
            >
              GDL in the news
            </Button>
          </Hidden>
        </Toolbar>
      </AppBar>
      <div id="mainContentWrapper">
        <main>{children}</main>
      </div>
      <Footer></Footer>
    </>
  )
}

export default Layout
