import { kebabToCamel } from "./utilities.js"
import {
  MODULE_PROPS,
  PROP_ALIAS_MAP,
  KEY,
  DATA,
  ATTR,
  PROP,
  HYPHEN_CHAR,
} from "./constants.js"

const MODULE_NAMES = [...Object.values(MODULE_PROPS), KEY]

function setPropToModule(data, module, key, value) {
  if (data[module]) {
    data[module][key] = value
  } else {
    data[module] = { [key]: value }
  }
}

/**
 * Moves all JSX props to valid snabbdom virtual node modules.
 * @param {Object} oldVNode
 * @param {Object} vnode
 */
export const transform = (oldVNode, _vnode) => {
  const vnode = _vnode || oldVNode

  if (vnode.data) {
    const nextModuleState = {},
      propKeys = []

    // remove all keys that match a module key

    for (const key in vnode.data) {
      if (MODULE_NAMES.indexOf(key) === -1) {
        propKeys.push(key)
      } else {
        nextModuleState[key] = vnode.data[key]
      }
    }

    const propsLength = propKeys.length
    let idx = -1

    // move all props to module entries

    while (++idx < propsLength) {
      const propKey = propKeys[idx]
      const propValue = vnode.data[propKey]

      // check if aliased prop name

      const aliasedKey = PROP_ALIAS_MAP[propKey]
      if (aliasedKey) {
        setPropToModule(
          nextModuleState,
          MODULE_PROPS.props,
          aliasedKey,
          propValue
        )
        continue
      }

      // check if prefixed prop name

      const hyphenIdx = propKey.indexOf(HYPHEN_CHAR)
      if (hyphenIdx > 0) {
        const prefix = propKey.slice(0, hyphenIdx)
        const modKey = prefix === DATA ? DATA : MODULE_PROPS[prefix]

        if (modKey) {
          const postfix = propKey.slice(hyphenIdx + 1)
          if (modKey === DATA) {
            setPropToModule(
              nextModuleState,
              MODULE_PROPS.dataset,
              kebabToCamel(postfix),
              propValue
            )
          } else {
            setPropToModule(nextModuleState, modKey, postfix, propValue)
          }

          continue
        }

        // check if attr- or prop-targeted prop name

        const targetedMod =
          prefix === ATTR
            ? MODULE_PROPS.attrs
            : prefix === PROP
              ? MODULE_PROPS.props
              : null

        if (targetedMod) {
          setPropToModule(
            nextModuleState,
            targetedMod,
            propKey.slice(hyphenIdx + 1),
            propValue
          )
          continue
        }
      }

      // fallback: move prop into `attrs`.

      setPropToModule(nextModuleState, MODULE_PROPS.attrs, propKey, propValue)
    }

    vnode.data = nextModuleState
  }
}

export const jsxDomPropsModule = { create: transform, update: transform }
