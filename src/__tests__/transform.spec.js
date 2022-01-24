import { jsx } from "snabbdom"
import { transformJsxProps } from "../transform-jsx"

const noop = () => {}

describe("transformJsxProps", () => {
  it("applies className prop to data.props.className", () => {
    const vnode = transformJsxProps(<div className="test" />)
    expect(vnode.data.className).toBe(undefined)
    expect(vnode.data.props.className).toEqual("test")
  })

  it("applies id prop to data.props.id", () => {
    const vnode = transformJsxProps(<div id="test" />)
    expect(vnode.data.id).toBe(undefined)
    expect(vnode.data.props.id).toEqual("test")
  })

  it("applies tabIndex prop to data.props.tabIndex", () => {
    const vnode = transformJsxProps(<div tabIndex={1} />)
    expect(vnode.data.tabIndex).toBe(undefined)
    expect(vnode.data.props.tabIndex).toEqual(1)
  })

  it("applies href prop to data.attrs.href", () => {
    const vnode = transformJsxProps(<div href="#" />)
    expect(vnode.data.href).toBe(undefined)
    expect(vnode.data.attrs.href).toEqual("#")
  })

  it("applies alt prop to data.attrs.alt", () => {
    const vnode = transformJsxProps(<div alt="test" />)
    expect(vnode.data.alt).toBe(undefined)
    expect(vnode.data.attrs.alt).toEqual("test")
  })

  it("applies src prop to data.attrs.src", () => {
    const vnode = transformJsxProps(<div src="test" />)
    expect(vnode.data.src).toBe(undefined)
    expect(vnode.data.attrs.src).toEqual("test")
  })

  it("applies type prop to data.attrs.type", () => {
    const vnode = transformJsxProps(<button type="button" />)
    expect(vnode.data.type).toBe(undefined)
    expect(vnode.data.attrs.type).toEqual("button")
  })

  it("applies aria-* prop to data.attrs['aria-*']", () => {
    const vnode = transformJsxProps(<div aria-label="test" />)
    expect(vnode.data["aria-label"]).toBe(undefined)
    expect(vnode.data.attrs["aria-label"]).toEqual("test")
  })

  it("applies data prop to data.dataset", () => {
    const vnode = transformJsxProps(<div data-foo-bar="test" />)
    expect(vnode.data["data-foo-bar"]).toBe(undefined)
    expect(vnode.data.dataset.fooBar).toEqual("test")
  })

  it("applies event handler to data.on", () => {
    const vnode = transformJsxProps(<div on-click={noop} />)
    expect(vnode.data["on-click"]).toBe(undefined)
    expect(vnode.data.on.click).toEqual(noop)
  })

  it("applies hook prop to data.hook", () => {
    const vnode = transformJsxProps(<div hook-update={noop} />)
    expect(vnode.data["hook-update"]).toBe(undefined)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("applies attr- prefixed props to data.attrs", () => {
    const vnode = transformJsxProps(<div attr-role="region" />)
    expect(vnode.data["attr-role"]).toBe(undefined)
    expect(vnode.data.attrs.role).toEqual("region")
  })

  it("applies prop- prefixed props to data.props", () => {
    const vnode = transformJsxProps(<div prop-dir="ltr" />)
    expect(vnode.data["prop-dir"]).toBe(undefined)
    expect(vnode.data.props.dir).toEqual("ltr")
  })

  it("applies multiple of the same prop", () => {
    const vnode = transformJsxProps(
      <div hook-update={noop} hook-insert={noop} />
    )
    expect(vnode.data["hook-insert"]).toBe(undefined)
    expect(vnode.data["hook-update"]).toBe(undefined)
    expect(vnode.data.hook.insert).toEqual(noop)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("retains peer properties, if they exist", () => {
    const vnode = transformJsxProps(
      <div className="test" props={{ role: "region" }} />
    )
    expect(vnode.data.props.className).toEqual("test")
    expect(vnode.data.props.role).toEqual("region")
  })
})
