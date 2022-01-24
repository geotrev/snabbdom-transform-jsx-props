import { jsx } from "snabbdom"
import { transform } from "../"

const noop = () => {}

describe("transform", () => {
  it("applies className prop to data.props.className", () => {
    const vnode = transform(<div className="test" />)
    expect(vnode.data.className).toBe(undefined)
    expect(vnode.data.props.className).toEqual("test")
  })

  it("applies id prop to data.props.id", () => {
    const vnode = transform(<div id="test" />)
    expect(vnode.data.id).toBe(undefined)
    expect(vnode.data.props.id).toEqual("test")
  })

  it("applies tabIndex prop to data.props.tabIndex", () => {
    const vnode = transform(<div tabIndex={1} />)
    expect(vnode.data.tabIndex).toBe(undefined)
    expect(vnode.data.props.tabIndex).toEqual(1)
  })

  it("applies href prop to data.attrs.href", () => {
    const vnode = transform(<div href="#" />)
    expect(vnode.data.href).toBe(undefined)
    expect(vnode.data.attrs.href).toEqual("#")
  })

  it("applies alt prop to data.attrs.alt", () => {
    const vnode = transform(<div alt="test" />)
    expect(vnode.data.alt).toBe(undefined)
    expect(vnode.data.attrs.alt).toEqual("test")
  })

  it("applies src prop to data.attrs.src", () => {
    const vnode = transform(<div src="test" />)
    expect(vnode.data.src).toBe(undefined)
    expect(vnode.data.attrs.src).toEqual("test")
  })

  it("applies type prop to data.attrs.type", () => {
    const vnode = transform(<button type="button" />)
    expect(vnode.data.type).toBe(undefined)
    expect(vnode.data.attrs.type).toEqual("button")
  })

  it("applies aria-* prop to data.attrs['aria-*']", () => {
    const vnode = transform(<div aria-label="test" />)
    expect(vnode.data["aria-label"]).toBe(undefined)
    expect(vnode.data.attrs["aria-label"]).toEqual("test")
  })

  it("applies data prop to data.dataset", () => {
    const vnode = transform(<div data-foo-bar="test" />)
    expect(vnode.data["data-foo-bar"]).toBe(undefined)
    expect(vnode.data.dataset.fooBar).toEqual("test")
  })

  it("applies event handler to data.on", () => {
    const vnode = transform(<div on-click={noop} />)
    expect(vnode.data["on-click"]).toBe(undefined)
    expect(vnode.data.on.click).toEqual(noop)
  })

  it("applies hook prop to data.hook", () => {
    const vnode = transform(<div hook-update={noop} />)
    expect(vnode.data["hook-update"]).toBe(undefined)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("applies attr- prefixed props to data.attrs", () => {
    const vnode = transform(<div attr-role="region" />)
    expect(vnode.data["attr-role"]).toBe(undefined)
    expect(vnode.data.attrs.role).toEqual("region")
  })

  it("applies prop- prefixed props to data.props", () => {
    const vnode = transform(<div prop-dir="ltr" />)
    expect(vnode.data["prop-dir"]).toBe(undefined)
    expect(vnode.data.props.dir).toEqual("ltr")
  })

  it("applies multiple of the same prop", () => {
    const vnode = transform(<div hook-update={noop} hook-insert={noop} />)
    expect(vnode.data["hook-insert"]).toBe(undefined)
    expect(vnode.data["hook-update"]).toBe(undefined)
    expect(vnode.data.hook.insert).toEqual(noop)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("retains peer properties, if they exist", () => {
    const vnode = transform(<div className="test" props={{ role: "region" }} />)
    expect(vnode.data.props.className).toEqual("test")
    expect(vnode.data.props.role).toEqual("region")
  })
})
