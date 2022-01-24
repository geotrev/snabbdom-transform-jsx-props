import { jsx } from "snabbdom"
import { benchmarkSuite } from "jest-bench"
import { transformJsx } from "../src"

const noop = () => {}

const props = {
  "aria-hidden": "true",
  "data-foo-bar": "bar",
  "aria-labelledby": "foobar",
  className: "baz",
  "prop-role": "region",
  "prop-value": "foo",
  "attr-hidden": "true",
  id: "barbaz",
  "on-click": noop,
  "on-mouseenter": noop,
}

const createNode = () => (
  <div {...props}>
    <p {...props}>
      <span {...props}>
        <span {...props}></span>
        <span {...props}></span>
        <span {...props}></span>
      </span>
      <span {...props}>
        <span {...props}></span>
        <span {...props}></span>
        <span {...props}></span>
      </span>
    </p>
  </div>
)

let fixture = createNode()

benchmarkSuite("perf", {
  control() {
    transformJsx(fixture)
  },
})
