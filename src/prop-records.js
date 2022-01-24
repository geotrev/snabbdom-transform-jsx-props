import { kebabToCamel } from "./utilities.js"

/**
 * Records are used to describe how a specific prop pattern should be applied
 * to the resulting Snabbdom vnode.
 *
 * - reg: the prop pattern as a regexp
 * - module: the target module, e.g. vnode.data[module]
 * - mutate: new property name within vnode.data[module]
 */

export const PropRecords = [
  // Generic
  {
    id: "data-",
    module: "dataset",
    mutate: (key) => kebabToCamel(key.slice(5)),
  },
  {
    id: "on-",
    module: "on",
    mutate: (key) => key.split("-")[1],
  },
  {
    id: "hook-",
    module: "hook",
    mutate: (key) => key.split("-")[1],
  },
  {
    id: "attr-",
    module: "attrs",
    mutate: (key) => key.split("-")[1],
  },
  {
    id: "prop-",
    module: "props",
    mutate: (key) => key.split("-")[1],
  },

  // Attributes and properties
  {
    id: "aria-",
    module: "attrs",
  },
  {
    id: "className",
    exact: true,
    module: "props",
  },
  {
    id: "id",
    exact: true,
    module: "props",
  },
]
