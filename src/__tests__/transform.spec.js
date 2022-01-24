import { jsx } from "snabbdom"
import { transformJsx } from "../transform-jsx"

const noop = () => {}

describe("transformJsx", () => {
  it("applies className prop to data.props.className", () => {
    const vnode = transformJsx(<div className="test" />)
    expect(vnode.data.className).toBe(undefined)
    expect(vnode.data.props.className).toEqual("test")
  })

  it("applies id prop to data.props.id", () => {
    const vnode = transformJsx(<div id="test" />)
    expect(vnode.data.id).toBe(undefined)
    expect(vnode.data.props.id).toEqual("test")
  })

  it("applies aria prop to data.attrs", () => {
    const vnode = transformJsx(<div aria-label="test" />)
    expect(vnode.data["aria-label"]).toBe(undefined)
    expect(vnode.data.attrs["aria-label"]).toEqual("test")
  })

  it("applies data prop to data.dataset", () => {
    const vnode = transformJsx(<div data-foo-bar="test" />)
    expect(vnode.data["data-foo-bar"]).toBe(undefined)
    expect(vnode.data.dataset.fooBar).toEqual("test")
  })

  it("applies event handler data.on", () => {
    const vnode = transformJsx(<div on-click={noop} />)
    expect(vnode.data["on-click"]).toBe(undefined)
    expect(vnode.data.on.click).toEqual(noop)
  })

  it("applies hook prop to data.hook", () => {
    const vnode = transformJsx(<div hook-update={noop} />)
    expect(vnode.data["hook-update"]).toBe(undefined)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("applies multiple of the same prop", () => {
    const vnode = transformJsx(<div hook-update={noop} hook-insert={noop} />)
    expect(vnode.data["hook-insert"]).toBe(undefined)
    expect(vnode.data["hook-update"]).toBe(undefined)
    expect(vnode.data.hook.insert).toEqual(noop)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("retains peer properties, if they exist", () => {
    const vnode = transformJsx(
      <div className="test" props={{ role: "region" }} />
    )
    expect(vnode.data.props.className).toEqual("test")
    expect(vnode.data.props.role).toEqual("region")
  })
})
