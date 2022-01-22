import path from "path"
import babel from "@rollup/plugin-babel"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import { terser } from "rollup-plugin-terser"

const currentDir = process.cwd()
const year = new Date().getFullYear()

const banner = async () => {
  const { default: pkg } = await import("../package.json")

  return `/*!
  * @license MIT (https://github.com/geotrev/${pkg.name}/blob/master/LICENSE)
  * ${pkg.name} v${pkg.version} (${pkg.homepage})
  * Copyright ${year} ${pkg.author}
  */`
}

const baseOutput = {
  banner,
  format: "cjs",
  sourcemap: true,
}

export default {
  input: path.resolve(currentDir, "src/index.js"),
  plugins: [
    nodeResolve(),
    babel({
      babelHelpers: "bundled",
      comments: false,
      exclude: "node_modules",
    }),
  ],
  output: [
    {
      ...baseOutput,
      file: path.resolve(currentDir, "lib/snabbdom-transform-jsx-props.js"),
    },
    {
      ...baseOutput,
      file: path.resolve(currentDir, "lib/snabbdom-transform-jsx-props.min.js"),
      plugins: [
        terser({
          output: {
            comments: (_, comment) => {
              const { value, type } = comment

              if (type === "comment2") {
                return /@preserve|@license|@cc_on/i.test(value)
              }
            },
          },
        }),
      ],
    },
  ],
}
