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
  let flatcat = []
  categories2d.forEach(categories => {
    categories.forEach(category => {
      if (!flatcat.includes(category)) flatcat.push(category)
    })
  })
  return flatcat
}

export function findMonthsAndYearsOfPosts(dates) {
  let monthYears = []
  dates.forEach(date => {
    var exactDate = date.split(" ")
    const monthYear = exactDate[0] + " " + exactDate[2]
    if (!monthYears.includes(monthYear)) monthYears.push(monthYear)
  })
  return monthYears
}

export function getArchiveLink(archiveDate) {
  let a = archiveDate.split(" ")
  let month = months.indexOf(a[0]) + 1
  if (month < 10) month = "0" + month
  return a[1] + "/" + month
}

export function pushToLists(data, categories2d, dates, titles) {
  if (titles.length === 0) {
    data.allMarkdownRemark.edges.forEach(node => {
      categories2d.push(node.node.frontmatter.categories)
      dates.push(node.node.frontmatter.date)
      titles.push(node.node.frontmatter.title)
    })
  }
}
