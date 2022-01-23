import { jsx } from "snabbdom"
import { transform } from "../transform.js"

const noop = () => {}

describe("transform", () => {
  it("applies className prop to data.props.className", () => {
    const state = transform(<div className="test" />)
    expect(state.data.className).toBe(undefined)
    expect(state.data.props.className).toEqual("test")
  })
  it("applies aria prop to data.attrs", () => {
    const state = transform(<div aria-label="test" />)
    expect(state.data["aria-label"]).toBe(undefined)
    expect(state.data.attrs["aria-label"]).toEqual("test")
  })
  it("applies data prop to data.dataset", () => {
    const state = transform(<div data-foo-bar="test" />)
    expect(state.data["data-foo-bar"]).toBe(undefined)
    expect(state.data.dataset.fooBar).toEqual("test")
  })
  it("applies event handler data.on", () => {
    const state = transform(<div on-click={noop} />)
    expect(state.data["on-click"]).toBe(undefined)
    expect(state.data.on.click).toEqual(noop)
  })
  it("applies hook prop to data.hook", () => {
    const state = transform(<div hook-update={noop} />)
    expect(state.data["hook-update"]).toBe(undefined)
    expect(state.data.hook.update).toEqual(noop)
  })
  it("applies multiple of the same prop", () => {
    const state = transform(<div hook-update={noop} hook-insert={noop} />)
    expect(state.data["hook-insert"]).toBe(undefined)
    expect(state.data["hook-update"]).toBe(undefined)
    expect(state.data.hook.insert).toEqual(noop)
    expect(state.data.hook.update).toEqual(noop)
  })
})
