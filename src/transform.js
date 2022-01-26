import { forEach, kebabToCamel } from "./utilities.js"
import {
  MODULE_PROPS,
  PROP_PROPS,
  KEY,
  DATA,
  ATTR,
  PROP,
  DATASET,
  HYPHEN_CHAR,
} from "./constants"

const moduleKeys = [...Object.values(MODULE_PROPS), DATASET, KEY]

function setPropToModule(vnode, deletions, module, propKey, moduleKey, value) {
  if (vnode.data[module]) {
    vnode.data[module][moduleKey] = value
  } else {
    vnode.data[module] = { [moduleKey]: value }
  }

  deletions.push(propKey)
}

/**
 * Moves all JSX props to valid snabbdom vnode modules.
 * @param {Object} vnode
 * @returns {Object} vnode
 */
export function transform(vnode) {
  if (vnode.data) {
    // remove all keys that match a module key
    const propKeys = Object.keys(vnode.data).filter(
      (key) => moduleKeys.indexOf(key) === -1
    )
    const deletions = []

    for (let i = 0; i < propKeys.length; i++) {
      const propKey = propKeys[i]
      const propValue = vnode.data[propKey]

      // Check whitelisted props
      const pkey = PROP_PROPS[propKey]
      if (pkey) {
        setPropToModule(
          vnode,
          deletions,
          MODULE_PROPS.props,
          propKey,
          pkey,
          propValue
        )
        continue
      }

      // Check for module/attr/prop prefixes
      const hyphenIdx = propKey.indexOf(HYPHEN_CHAR)
      if (hyphenIdx > 0) {
        const prefix = propKey.slice(0, hyphenIdx)
        const modKey = prefix === DATA ? DATA : MODULE_PROPS[prefix]

        if (modKey) {
          const postfix = propKey.slice(hyphenIdx + 1)

          if (modKey === DATA) {
            setPropToModule(
              vnode,
              deletions,
              DATASET,
              propKey,
              kebabToCamel(postfix),
              propValue
            )
          } else {
            setPropToModule(
              vnode,
              deletions,
              modKey,
              propKey,
              postfix,
              vnode.data[propKey]
            )
          }

          continue
        }

        if (prefix === ATTR) {
          setPropToModule(
            vnode,
            deletions,
            MODULE_PROPS.attrs,
            propKey,
            propKey.slice(hyphenIdx + 1),
            propValue
          )
          continue
        }

        if (prefix === PROP) {
          setPropToModule(
            vnode,
            deletions,
            MODULE_PROPS.props,
            propKey,
            propKey.slice(hyphenIdx + 1),
            propValue
          )
          continue
        }
      }

      // Move everything else into `attrs`.
      setPropToModule(
        vnode,
        deletions,
        MODULE_PROPS.attrs,
        propKey,
        propKey,
        propValue
      )
    }

    forEach(deletions, (key) => delete vnode.data[key])
  }

  if (Array.isArray(vnode.children)) {
    forEach(vnode.children, transform)
  }

  return vnode
}
