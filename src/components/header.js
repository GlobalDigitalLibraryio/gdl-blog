import { Link, StaticQuery } from "gatsby"
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
import Dropdown from "./dropdown"
import drawerIcon from "../images/menuIcon.png"
//import "../styles/header.css"

const menuItmens = [
  ["Home", "https://home.digitallibrary.io/about/"],
  ["Blog", "#"],
  ["About", "https://home.digitallibrary.io/about/"],
  ["Contact", "https://home.digitallibrary.io/contact/"],
  ["GDL in the news", "https://home.digitallibrary.io/gdl-in-the-news/"],
]

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export function MakeFlatCategoireList(categories2d) {
  const flatcat = []
  var catlist
  for (catlist in categories2d) {
    var cat
    for (cat in categories2d[catlist]) {
      if (!flatcat.includes(categories2d[catlist][cat])) {
        flatcat.push(categories2d[catlist][cat])
      }
    }
  }
  return flatcat
}

export function findMonthsAndYearsOfPosts(dates) {
  const monthYears = []
  var i
  for (i in dates) {
    var exactDate = dates[i].split(" ")
    const monthYear = exactDate[0] + " " + exactDate[2]
    if (!monthYears.includes(monthYear)) monthYears.push(monthYear)
  }
  return monthYears
}

export function fiveRecentPosts(title) {
  const recentTitles = []
  var i
  for (i in title) {
    if (i >= 5) return recentTitles
    else recentTitles.push(title[i])
  }
  return recentTitles
}

const categories2d = []
const dates = []
const titles = []

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: "1px solid ${theme.palette.divider}",
  },
  toolbarTitle: {
    flex: 1,
  },

  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: "white",
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
        <img src={gdlLogo} aria-hidden alt="logo" />
      </Link>
    </Typography>
  )
}

const bigHeader = classes => {
  return (
    <Toolbar className={classes.toolbar}>
      {logoImg(classes)}
      {menuItmens.map(menuItem => (
        <a
          key={menuItem[0]}
          variant="body2"
          href={menuItem[1]}
          className={classes.toolbarLink}
        >
          {menuItem[0]}
        </a>
      ))}
      <Divider />
    </Toolbar>
  )
}
function getArchiveLinks(archive) {
  const archiveLinks = []
  var i
  for (i in archive) {
    let a = archive[i].split(" ")
    let month = months.indexOf(a[0]) + 1
    if (month < 10) month = "0" + month
    archiveLinks.push(a[1] + "/" + month)
  }
  return archiveLinks
}

function getCatLink(categories) {
  const categoryLinks = []
  var j
  for (j in categories) {
    categoryLinks.push(
      "category/" + categories[j].replace(/\s+/g, "-").toLowerCase()
    )
  }
  return categoryLinks
}

const sideList = (
  side,
  classes,
  state,
  setState,
  categories,
  archive,
  recentPosts
) => (
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
    <List>
      <ListItem button key="Recent">
        <Dropdown>
          Recent Posts
          {recentPosts}
          {recentPosts}
        </Dropdown>
      </ListItem>
      <ListItem button key="Categories" href="/categories">
        <Dropdown>
          Categories
          {categories}
          {getCatLink(categories)}
        </Dropdown>
      </ListItem>
      <ListItem button key="Archive">
        <Dropdown>
          Archive
          {archive}
          {getArchiveLinks(archive)}
        </Dropdown>
      </ListItem>
    </List>
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

function smalHeader(
  classes,
  state,
  setState,
  categories,
  archive,
  recentPosts
) {
  return (
    <div>
      <Toolbar className={classes.toolbar}>
        <Button onClick={toggleDrawer("left", true, state, setState)}>
          <img src={drawerIcon} style={smallImg}></img>
        </Button>
        {logoImg(classes)}
        <SwipeableDrawer
          open={state.left}
          onClose={toggleDrawer("left", false, state, setState)}
          onOpen={toggleDrawer("left", true, state, setState)}
        >
          {sideList(
            " ",
            classes,
            state,
            setState,
            categories,
            archive,
            recentPosts
          )}
        </SwipeableDrawer>
      </Toolbar>
    </div>
  )
}

function pushToLists(data) {
  if (titles.length === 0) {
    data.allMarkdownRemark.edges.map(node => {
      categories2d.push(node.node.frontmatter.categories)
      dates.push(node.node.frontmatter.date)
      titles.push(node.node.frontmatter.title)
    })
  }
}

function Header() {
  const classes = useStyles()
  const [state, setState] = React.useState({
    left: false,
  })
  return (
    <StaticQuery
      query={dropdownQuery}
      render={data => (
        <>
          {pushToLists(data)}

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
              <Hidden mdUp>
                {smalHeader(
                  classes,
                  state,
                  setState,
                  MakeFlatCategoireList(categories2d),
                  findMonthsAndYearsOfPosts(dates),
                  fiveRecentPosts(titles)
                )}
              </Hidden>
              <Hidden smDown>{bigHeader(classes)}</Hidden>
            </div>
          </header>
        </>
      )}
    />
  )
}

const dropdownQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            categories
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`

export default Header
