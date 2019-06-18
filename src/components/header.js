import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Divider from "@material-ui/core/Divider"
import Toolbar from "@material-ui/core/Toolbar"
import gdlLogo from "../images/gdl-logo.svg"
import { css } from "@emotion/core"

const menuItmens = [
  ["Home", "https://home.digitallibrary.io/about/"],
  ["Blog", "#"],
  ["About", "https://home.digitallibrary.io/about/"],
  ["Contact", "https://home.digitallibrary.io/contact/"],
  ["GDL in the news", "https://home.digitallibrary.io/gdl-in-the-news/"],
]

const useStyles = makeStyles(theme => ({
  toolbar: {
    borderBottom: "1px solid ${theme.palette.divider}",
  },
  toolbarTitle: {
    flex: 1,
    colorPrimary: "white",
  },

  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}))
const styles = {
  logo: css`
    img {
      margin-top: 2px;
      height: 36px;
      width: 100px;
      margin-left: 15px;
    }
  `,
  center: css`
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 300px;
    text-align: center;
  `,
}

function Header({ siteTitle }) {
  const classes = useStyles()
  return (
    <header
      id="header"
      style={{
        background: `#0277BD`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
        }}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h2"
            variant="h5"
            align="left"
            className={classes.toolbarTitle}
          >
            <Link to="/" css={styles.logo} aria-label="Global Digital Library">
              <img src={gdlLogo} aria-hidden alt="logo" />
            </Link>
          </Typography>
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
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
