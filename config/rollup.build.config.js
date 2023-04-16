import fs from "fs"
import path from "path"
import babel from "@rollup/plugin-babel"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import terser from "@rollup/plugin-terser"

const loadJSON = (path) =>
  JSON.parse(fs.readFileSync(new URL(path, import.meta.url)))

const dirname = path.resolve()
const year = new Date().getFullYear()

const banner = async () => {
  const pkg = loadJSON("../package.json")

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
  input: path.resolve(dirname, "src/index.js"),
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
      file: path.resolve(dirname, "lib/snabbdom-transform-jsx-props.js"),
    },
    {
      ...baseOutput,
      file: path.resolve(dirname, "lib/snabbdom-transform-jsx-props.min.js"),
      plugins: [terser()],
    },
  ],
}
