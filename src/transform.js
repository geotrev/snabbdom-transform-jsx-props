import { forEach } from "./utilities.js"
import { PropRecords } from "./prop-map.js"

/**
 * Converts JSX props to valid snabbdom vnode modules.
 * @param {Object} vnode
 * @returns {Object} vnode
 */
export function transform(vnode) {
  if (vnode.data) {
    const propKeys = Object.keys(vnode.data)
    const deletions = []

    forEach(PropRecords, (record) => {
      const matches = propKeys.filter((key) => record.reg.test(key))
      if (!matches.length) return

      forEach(matches, (propKey) => {
        const { module, mutate } = record
        const moduleKey = mutate ? mutate(propKey) : propKey
        const value = vnode.data[propKey]

        if (vnode.data[module]) {
          vnode.data[module][moduleKey] = value
        } else {
          vnode.data[module] = { [moduleKey]: value }
        }

        deletions.push(propKey)
      })
    })

    forEach(deletions, (key) => delete vnode.data[key])
  }

  if (Array.isArray(vnode.children)) {
    forEach(vnode.children, transform)
  }

  return vnode
}
