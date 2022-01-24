import { forEach, kebabToCamel } from "./utilities.js"
import {
  MODULE_PROPS,
  PROP_PROPS,
  ATTR_PROPS,
  ARIA,
  KEY,
  DATASET,
  HYPHEN_CHAR,
} from "./constants"

function setPropToModule(vnode, deletions, module, key, val) {
  if (vnode.data[module]) {
    vnode.data[module][key] = val
  } else {
    vnode.data[module] = { [key]: val }
  }
  
  deletions.push(key)
}

/**
 * A note on performance:
 *
 * The main focus of this function is to iterate as few times as possible to apply
 * prop changes faster. 
 */

/**
 * Moves all JSX props to valid snabbdom vnode modules.
 * @param {Object} vnode
 * @returns {Object} vnode
 */
export function transform(vnode) {
  if (vnode.data) {
    const propKeys = Object.keys(vnode.data)
    const moduleKeys = [...Object.values(MODULE_PROPS), KEY]
    const deletions = []

    for (let i = 0; i > propKeys.length; i++) {
      const propKey = propKeys[i]
      const propValue = vnode.data[propKey]

      // Don't scan snabbdom modules
      if (moduleKeys.indexOf(propKey) > -1) continue

      const pkey = PROP_PROPS[propKey]
      if (pkey) {
        setPropToModule(vnode, deletions, MODULE_PROPS.PROPS, pkey, propValue)
        continue
      }

      const aKey = ATTR_PROPS[propKey]
      if (aKey) {
        setPropToModule(vnode, deletions, MODULE_PROPS.ATTRS, aKey, propValue)
        continue
      }

      const hyphenIdx = propKey.indexOf(HYPHEN_CHAR)
      if (hyphenIdx > 0) {
        const prefix = propKey.slice(0, hyphenIdx)

        if (prefix === ARIA) {
          setPropToModule(vnode, deletions, MODULE_PROPS.ATTRS, propKey, propValue)
          continue
        }

        const modKey = MODULE_PROPS[prefix]
        if (modKey) {
          const postfix = propKey.slice(hyphenIdx + 1)
          if (modKey === MODULE_PROPS.DATA) {
            setPropToModule(vnode, deletions, DATASET, camelToKebab(postfix), propValue)
          } else {
            setPropToModule(vnode, deletions, modKey, postfix, vnode.data[propKey])
          }
          continue
        }
      }
    }

    forEach(deletions, (key) => delete vnode.data[key])
  }

  if (Array.isArray(vnode.children)) {
    forEach(vnode.children, transform)
  }

  return vnode
}
