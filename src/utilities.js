/**
 * Simplified lodash implementation.
 * If `false` is explicitly returned, break the loop.
 * @param {[]} items
 * @param fn
 */
export const forEach = (items, fn) => {
  const length = items.length
  if (!length) return
  let idx = -1
  while (++idx < length) {
    if (fn(items[idx], idx) === false) break
  }
}

/**
 * Converts a kebab-case string to camelCase.
 * @param {string} value
 * @returns {string}
 */
export const kebabToCamel = (value) =>
  value &&
  value
    .split("-")
    .map((word, i) =>
      i > 0
        ? word[0].toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase()
    )
    .join("")
