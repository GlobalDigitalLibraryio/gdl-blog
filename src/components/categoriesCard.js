import React from "react"
import { StaticQuery } from "gatsby"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { kebabCase } from "../components/kebabCase"
import { graphql } from "gatsby"
import Link from "@material-ui/core/Link"

import "../styles/blog-listings.css"
const colStyle = {
  display: "flex",
  flexDirection: "column",
}

function listCategoriesWithMore(categories, more) {
  if (more) {
    const slicedList = categories.slice(0, 5)
    return (
      <>
        {listCategories(slicedList)}
        <Link
          display="block"
          variant="body1"
          href="/categories/"
          className="sidebarContent"
        >
          <b>more...</b>
        </Link>
      </>
    )
  } else {
    return listCategories(categories)
  }
}

function listCategories(categories) {
  return categories.map(category => (
    <Link
      display="block"
      variant="body1"
      href={`/category/${kebabCase(category.fieldValue)}/`}
      className="sidebarContent"
      key={category.fieldValue}
    >
      {category.fieldValue} ({category.totalCount})
    </Link>
  ))
}

const CategoryCard = ({ children }) => (
  <StaticQuery
    query={graphql`
      query {
        allMarkdownRemark(
          limit: 2000
          sort: { order: DESC, fields: [frontmatter___categories] }
        ) {
          group(field: frontmatter___categories) {
            fieldValue
            totalCount
          }
        }
      }
    `}
    render={data => (
      <Card className="Card">
        <CardContent>
          <Typography variant="h6" gutterBottom style={colStyle}>
            Categories
            {listCategoriesWithMore(data.allMarkdownRemark.group, children)}
          </Typography>
        </CardContent>
      </Card>
    )}
  />
)

export default CategoryCard
