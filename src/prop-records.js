import { kebabToCamel } from "./utilities.js"

/**
 * These records describe how a given prop signature should be
 * muted and applied to a Snabbdom virtual node.
 *
 * - id: the prop identifier (usually a prefix, but not always)
 * - module: the target module, e.g. vnode.data[module]
 * - mutate: how the key should be mutated when added to a module
 * - exact: instructs the lib to compare the id 1:1 with a prop name
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
  {
    id: "tabIndex",
    exact: true,
    module: "props",
  },
  {
    id: "href",
    exact: true,
    module: "attrs",
  },
  {
    id: "alt",
    exact: true,
    module: "attrs",
  },
  {
    id: "src",
    exact: true,
    module: "attrs",
  },
  {
    id: "type",
    exact: true,
    module: "attrs",
  },
]
