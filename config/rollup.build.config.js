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

const Formats = {
  CJS: "cjs",
  ES: "es",
}
const input = path.resolve(currentDir, "src/index.js")
const basePlugins = [
  nodeResolve(),
  babel({
    babelHelpers: "bundled",
    comments: false,
    exclude: "node_modules",
  }),
]

const terserPlugin = terser({
  output: {
    comments: (_, comment) => {
      const { value, type } = comment

      if (type === "comment2") {
        return /@preserve|@license|@cc_on/i.test(value)
      }
    },
  },
})

const baseOutput = (format) => ({
  banner,
  format,
  sourcemap: true,
})

const outputs = [Formats.ES, Formats.CJS].reduce(
  (configs, format) => [
    ...configs,
    {
      ...baseOutput(format),
      file: path.resolve(
        currentDir,
        `lib/snabbdom-transform-jsx-props.${format}.js`
      ),
    },
    {
      ...baseOutput(format),
      file: path.resolve(
        currentDir,
        `lib/snabbdom-transform-jsx-props.${format}.min.js`
      ),
      plugins: [terserPlugin],
    },
  ],
  []
)

export default {
  input,
  plugins: basePlugins,
  output: [...outputs],
}
