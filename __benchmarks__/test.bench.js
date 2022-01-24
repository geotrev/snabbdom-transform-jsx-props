import { jsx } from "snabbdom"
import { benchmarkSuite } from "jest-bench"
import { transformJsxProps } from "../src"

const noop = () => {}

const props = {
  "data-foo-bar": "test",
  "prop-role": "test",
  "prop-value": "test",
  "attr-hidden": "test",
  "on-click": noop,
  "on-mouseenter": noop,
  "aria-labelledby": "test",
  "aria-hidden": "test",
  className: "test",
  id: "test",
  tabIndex: "test",
  href: "test",
  alt: "test",
  src: "test",
  type: "test",
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
    transformJsxProps(fixture)
  },
})
