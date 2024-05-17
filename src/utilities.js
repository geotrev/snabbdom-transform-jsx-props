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
