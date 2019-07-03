/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
const { fmImagesToRelative } = require("gatsby-remark-relative-images")

exports.onCreateNode = ({ node }) => {
  fmImagesToRelative(node)
}
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    // Use `createFilePath` to turn markdown files in our `data/faqs` directory into `/faqs/slug`
    const relativeFilePath = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    // Creates new queryable field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `${relativeFilePath}`,
    })
  }
}
const path = require(`path`)
const _ = require("lodash")

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions

  const plainLayout = path.resolve("src/templates/blogTemplate.js")
  const tagTemplate = path.resolve("src/templates/categories.js")
  const archiveTemplate = path.resolve(`src/templates/monthlyPosts.js`)

  return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 2000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              date
              categories
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }
    const posts = result.data.allMarkdownRemark.edges

    function getNextYear(year) {
      return year + 1
    }
    function getNextMonthWithYear(month, year) {
      if (month == 12) return "01", getNextYear(year)
      let nextMonth = month + 1
      if (nextMonth < 10) nextMonth = "0" + nextMonth
      let y = year.toString()
      nextMonth = nextMonth.toString()
      let yms = "" + y + "-" + nextMonth
      return yms
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      let d = new Date(node.frontmatter.date)

      let year = d.getFullYear()
      let nextYear = getNextYear(year)
      let month = d.getMonth() + 1
      const nextMonthYear = getNextMonthWithYear(month, year)
      if (month < 10) month = "0" + month
      const monthYear = year + "-" + month
      year = year.toString()
      nextYear = nextYear.toString()
      month = month.toString()
      let thisDate = year
      let nextDate = nextYear

      createPage({
        path: year,
        component: archiveTemplate,
        context: {
          thisDate,
          nextDate,
        },
      })
      thisDate = monthYear
      nextDate = nextMonthYear

      createPage({
        path: year + "/" + month,
        component: archiveTemplate,
        context: {
          thisDate,
          nextDate,
        },
      })

      const months = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ]
      let dato = new Date(node.frontmatter.date)
      let formatted_date =
        months[dato.getMonth()] +
        "-" +
        (dato.getDate() > 9 ? dato.getDate() : "0" + dato.getDate()) +
        "-" +
        dato.getFullYear()
      createPage({
        path: formatted_date + "-" + _.kebabCase(node.frontmatter.title),
        component: plainLayout,
        context: {
          slug: node.fields.slug,
        }, // additional data can be passed via context
      })
    })

    // Tag pages:
    let tags = []
    // Iterate through each post, putting all found tags into `tags`
    _.each(posts, edge => {
      if (_.get(edge, "node.frontmatter.categories")) {
        tags = tags.concat(edge.node.frontmatter.categories)
      }
    })
    // Eliminate duplicate tags
    tags = _.uniq(tags)

    // Make tag pages
    tags.forEach(tag => {
      createPage({
        path: `category/${_.kebabCase(tag)}/`,
        component: tagTemplate,
        context: {
          tag,
        },
      })
    })
  })
}
