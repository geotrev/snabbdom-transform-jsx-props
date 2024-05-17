import { jsx } from "snabbdom"
import { transform } from "../jsxDomPropsModule"

const noop = () => {}

describe("transform()", () => {
  it("applies className prop to data.props.className", () => {
    const vnode = <div className="test" />
    transform(null, vnode)
    expect(vnode.data.props.className).toEqual("test")
  })

  it("applies id prop to data.props.id", () => {
    const vnode = <div id="test" />
    transform(null, vnode)
    expect(vnode.data.props.id).toEqual("test")
  })

  it("applies tabIndex prop to data.props.tabIndex", () => {
    const vnode = <div tabIndex={1} />
    transform(null, vnode)
    expect(vnode.data.props.tabIndex).toEqual(1)
  })

  it("applies generic prop to data.attrs", () => {
    const vnode = <div href="#" />
    transform(null, vnode)
    expect(vnode.data.attrs.href).toEqual("#")
  })

  it("applies aria-* prop to data.attrs['aria-*']", () => {
    const vnode = <div aria-label="test" />
    transform(null, vnode)
    expect(vnode.data.attrs["aria-label"]).toEqual("test")
  })

  it("applies data prop to data.dataset", () => {
    const vnode = <div data-foo-bar="test" />
    transform(null, vnode)
    expect(vnode.data.dataset.fooBar).toEqual("test")
  })

  it("applies event handler to data.on", () => {
    const vnode = <div on-click={noop} />
    transform(null, vnode)
    expect(vnode.data.on.click).toEqual(noop)
  })

  it("applies hook prop to data.hook", () => {
    const vnode = <div hook-update={noop} />
    transform(null, vnode)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("applies attr- prefixed props to data.attrs", () => {
    const vnode = <div attr-role="region" />
    transform(null, vnode)
    expect(vnode.data.attrs.role).toEqual("region")
  })

  it("applies prop- prefixed props to data.props", () => {
    const vnode = <div prop-dir="ltr" />
    transform(null, vnode)
    expect(vnode.data.props.dir).toEqual("ltr")
  })

  it("applies prefixed props to existing module definition", () => {
    const vnode = <div hook-update={noop} hook-insert={noop} />
    transform(null, vnode)
    expect(vnode.data.hook.insert).toEqual(noop)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("retains peer properties, if they exist", () => {
    const vnode = <div className="test" props={{ role: "region" }} />
    transform(null, vnode)
    expect(vnode.data.props.className).toEqual("test")
    expect(vnode.data.props.role).toEqual("region")
  })

  it("removes leftover prop from vnode.data", () => {
    const vnode = <div className="test" />
    transform(null, vnode)
    expect(vnode.data.className).toBe(undefined)
  })

  describe("modules", () => {
    it("does not regress: event listeners", () => {
      const vnode = <button on={{ click: noop }} />
      transform(null, vnode)
      expect(vnode.data.on.click).toEqual(noop)
    })

    it("does not regress: class", () => {
      const vnode = <button class={{ test: true }} />
      transform(null, vnode)
      expect(vnode.data.class.test).toBe(true)
    })

    it("does not regress: props", () => {
      const vnode = <button props={{ tabIndex: 0 }} />
      transform(null, vnode)
      expect(vnode.data.props.tabIndex).toEqual(0)
    })

    it("does not regress: style", () => {
      const vnode = <button style={{ fontWeight: "bold" }} />
      transform(null, vnode)
      expect(vnode.data.style.fontWeight).toEqual("bold")
    })

    it("does not regress: dataset", () => {
      const vnode = <button dataset={{ fooBar: "baz" }} />
      transform(null, vnode)
      expect(vnode.data.dataset.fooBar).toEqual("baz")
    })

    it("does not regress: attributes", () => {
      const vnode = <button attrs={{ tabindex: "0" }} />
      transform(null, vnode)
      expect(vnode.data.attrs.tabindex).toEqual("0")
    })

    it("does not regress: hooks", () => {
      const vnode = <button hook={{ insert: noop }} />
      transform(null, vnode)
      expect(vnode.data.hook.insert).toEqual(noop)
    })

    it("does not regress: key", () => {
      const vnode = <button key="test" />
      transform(null, vnode)
      expect(vnode.data.key).toEqual("test")
    })
  })
})
