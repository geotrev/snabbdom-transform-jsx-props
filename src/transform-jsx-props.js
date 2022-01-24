import { forEach } from "./utilities.js"
import { PropRecords } from "./prop-records.js"

/**
 * A note on performance:
 *
 * There are a lot of loops happening here, but essentially this is what
 * is happening here:
 *
 * The following happens for each virtual node in a given tree:
 * 1. Detect if the vnode has any props (data) at all.
 * 2. If it does, gather them into an array
 * 3. Iterate through this libs' prop records
 *  a. Determine if any keys in the vnode match a given record pattern
 *  b. If there are no matches, skip this iteration
 *  c. If there are matches, apply the transformation to each match
 *  d. Mark the prop for deletion
 *  e. Finally, if there are any deletions found, delete them from the vnode
 * 4. If the vnode has children, rinse and repeat for each recursively.
 *
 * This operation is On^2 at best, which as bad as it sounds, is made tolerable
 * by the fact there's many guard checks to prevent unnecessary iteration.
 */

/**
 * Converts JSX props to valid snabbdom vnode modules.
 * @param {Object} vnode
 * @returns {Object} vnode
 */
export function transformJsxProps(vnode) {
  if (vnode.data) {
    const propKeys = Object.keys(vnode.data)
    const deletions = []

    forEach(PropRecords, (record) => {
      const matches = []

      forEach(propKeys, (key) => {
        if ((record.exact && key === record.id) || key.startsWith(record.id)) {
          return matches.push(key)
        }
      })

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
    forEach(vnode.children, transformJsxProps)
  }

  return vnode
}
