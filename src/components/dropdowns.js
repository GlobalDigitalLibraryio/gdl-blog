import React from "react"
import Toolbar from "@material-ui/core/Toolbar"
import { makeStyles } from "@material-ui/core/styles"
import Dropdown from "./dropdown"

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

const useStyles = makeStyles(theme => ({
  toolbarSecondary: {
    justifyContent: "space-between",
    overflowX: "auto",
  },
  toolbarLink: {
    flexShrink: 0,
  },
}))

function Dropdowns({ children }) {
  const categories = children[0]
  const archive = children[1]
  const recentPosts = children[2]
  const styles = useStyles()
  const archiveLinks = []
  var i
  for (i in archive) {
    let a = archive[i].split(" ")
    let month = months.indexOf(a[0]) + 1
    if (month < 10) month = "0" + month
    archiveLinks.push(a[1] + "/" + month)
  }
  const categoryLinks = []
  var j
  for (j in categories) {
    categoryLinks.push(
      "category/" + categories[j].replace(/\s+/g, "-").toLowerCase()
    )
  }

  return (
    <div>
      <Toolbar
        component="nav"
        variant="dense"
        className={styles.toolbarSecondary}
      >
        <Dropdown>
          Categories
          {categories}
          {categoryLinks}
        </Dropdown>
        <Dropdown>
          Archive
          {archive}
          {archiveLinks}
        </Dropdown>
        <Dropdown>
          Recent posts
          {recentPosts}
        </Dropdown>
      </Toolbar>
    </div>
  )
}
export default Dropdowns
