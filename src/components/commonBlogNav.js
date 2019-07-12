//@flow
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

export function findMonthsAndYearsOfPosts(dates: Array<string>) {
  let monthYears = []
  dates.forEach(date => {
    const exactDate = date.split(" ")
    const monthYear = exactDate[0] + " " + exactDate[2]
    if (!monthYears.includes(monthYear)) monthYears.push(monthYear)
  })
  return monthYears
}

export function getArchiveLink(archiveDate: string) {
  let a = archiveDate.split(" ")
  let month = months.indexOf(a[0]) + 1
  if (month < 10) month = "0" + month
  return a[1] + "/" + month
}
