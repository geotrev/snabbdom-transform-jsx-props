import { kebabToCamel } from "./utilities.js"

export const PropRecords = [
  {
    reg: /^aria-/,
    module: "attrs",
  },
  {
    reg: /^data-/,
    module: "dataset",
    mutate: (key) => kebabToCamel(key.slice(5)),
  },
  {
    reg: /^on-/,
    module: "on",
    mutate: (key) => key.split("-")[1],
  },
  {
    reg: /^hook-/,
    module: "hook",
    mutate: (key) => key.split("-")[1],
  },
  {
    reg: /^className$/,
    module: "props",
  },
]
