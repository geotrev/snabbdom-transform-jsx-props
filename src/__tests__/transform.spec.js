import { jsx } from "snabbdom"
import { transform } from "../transform.js"

/* eslint-disable jest/expect-expect */

describe("transform", () => {
  it("applies className prop to data.props.className", () => {
    const state = transform(<div className="foo" />)
    expect(state.data.className).toBe(undefined)
    expect(state.data.props.className).toBe("foo")
  })
  it("applies aria prop to data.attrs", () => {})
  it("applies data prop to data.dataset", () => {})
  it("applies event handler data.on", () => {})
  it("applies hook prop to data.hook", () => {})
  it("applies multiple of the same prop", () => {})
})
