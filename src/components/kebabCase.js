import React from "react"

export function kebabCase(string) {
  let str = string.toString()
  str = str.replace(/\s/g, "-")
  str = str.replace(/(\?+)|(!+)|(,+)|(_+)|(\.+)/g, "")
  str = str.toLowerCase()
  return str
}
