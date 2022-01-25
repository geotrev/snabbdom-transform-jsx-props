import { forEach, kebabToCamel } from "./utilities.js"
import {
  MODULE_PROPS,
  PROP_PROPS,
  KEY,
  ATTR,
  PROP,
  DATASET,
  HYPHEN_CHAR,
} from "./constants"

function setPropToModule(vnode, deletions, module, key, value, dataKey) {
  if (vnode.data[module]) {
    vnode.data[module][key] = value
  } else {
    vnode.data[module] = { [key]: value }
  }

  deletions.push(dataKey || key)
}

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

    for (let i = 0; i < propKeys.length; i++) {
      const propKey = propKeys[i]
      const propValue = vnode.data[propKey]

      // Don't scan snabbdom modules
      if (moduleKeys.indexOf(propKey) > -1) continue

      const pkey = PROP_PROPS[propKey]
      if (pkey) {
        setPropToModule(vnode, deletions, MODULE_PROPS.props, pkey, propValue)
        continue
      }

      const hyphenIdx = propKey.indexOf(HYPHEN_CHAR)
      if (hyphenIdx > 0) {
        const prefix = propKey.slice(0, hyphenIdx)
        const modKey = MODULE_PROPS[prefix]

        if (modKey) {
          const postfix = propKey.slice(hyphenIdx + 1)

          if (modKey === MODULE_PROPS.data) {
            setPropToModule(
              vnode,
              deletions,
              DATASET,
              kebabToCamel(postfix),
              propValue,
              propKey
            )
          } else {
            setPropToModule(
              vnode,
              deletions,
              modKey,
              postfix,
              vnode.data[propKey],
              propKey
            )
          }

          continue
        }

        if (prefix === ATTR) {
          setPropToModule(
            vnode,
            deletions,
            MODULE_PROPS.attrs,
            propKey.slice(hyphenIdx + 1),
            propValue,
            propKey
          )
          continue
        }

        if (prefix === PROP) {
          setPropToModule(
            vnode,
            deletions,
            MODULE_PROPS.props,
            propKey.slice(hyphenIdx + 1),
            propValue,
            propKey
          )
          continue
        }
      }

      // As a fallback, we'll move everything else into `attrs`.
      setPropToModule(vnode, deletions, MODULE_PROPS.attrs, propKey, propValue)
    }

    forEach(deletions, (key) => delete vnode.data[key])
  }

  if (Array.isArray(vnode.children)) {
    forEach(vnode.children, transform)
  }

  return vnode
}
