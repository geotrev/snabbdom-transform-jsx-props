import { jsx } from "snabbdom"
import { transform } from "../"

const noop = () => {}

describe("transform", () => {
  it("applies className prop to data.props.className", () => {
    const vnode = transform(<div className="test" />)
    expect(vnode.data.props.className).toEqual("test")
  })

  it("applies id prop to data.props.id", () => {
    const vnode = transform(<div id="test" />)
    expect(vnode.data.props.id).toEqual("test")
  })

  it("applies tabIndex prop to data.props.tabIndex", () => {
    const vnode = transform(<div tabIndex={1} />)
    expect(vnode.data.props.tabIndex).toEqual(1)
  })

  it("applies generic prop to data.attrs", () => {
    const vnode = transform(<div href="#" />)
    expect(vnode.data.attrs.href).toEqual("#")
  })

  it("applies aria-* prop to data.attrs['aria-*']", () => {
    const vnode = transform(<div aria-label="test" />)
    expect(vnode.data.attrs["aria-label"]).toEqual("test")
  })

  it("applies data prop to data.dataset", () => {
    const vnode = transform(<div data-foo-bar="test" />)
    expect(vnode.data.dataset.fooBar).toEqual("test")
  })

  it("applies event handler to data.on", () => {
    const vnode = transform(<div on-click={noop} />)
    expect(vnode.data.on.click).toEqual(noop)
  })

  it("applies hook prop to data.hook", () => {
    const vnode = transform(<div hook-update={noop} />)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("applies attr- prefixed props to data.attrs", () => {
    const vnode = transform(<div attr-role="region" />)
    expect(vnode.data.attrs.role).toEqual("region")
  })

  it("applies prop- prefixed props to data.props", () => {
    const vnode = transform(<div prop-dir="ltr" />)
    expect(vnode.data.props.dir).toEqual("ltr")
  })

  it("applies prefixed props to existing module definition", () => {
    const vnode = transform(<div hook-update={noop} hook-insert={noop} />)
    expect(vnode.data.hook.insert).toEqual(noop)
    expect(vnode.data.hook.update).toEqual(noop)
  })

  it("retains peer properties, if they exist", () => {
    const vnode = transform(<div className="test" props={{ role: "region" }} />)
    expect(vnode.data.props.className).toEqual("test")
    expect(vnode.data.props.role).toEqual("region")
  })

  it("removes leftover prop from vnode.data", () => {
    const vnode = transform(<div className="test" />)
    expect(vnode.data.className).toBe(undefined)
  })

  describe("modules", () => {
    it("does not regress: event listeners", () => {
      const vnode = transform(<button on={{ click: noop }} />)
      expect(vnode.data.on.click).toEqual(noop)
    })

    it("does not regress: class", () => {
      const vnode = transform(<button class={{ test: true }} />)
      expect(vnode.data.class.test).toBe(true)
    })

    it("does not regress: props", () => {
      const vnode = transform(<button props={{ tabIndex: 0 }} />)
      expect(vnode.data.props.tabIndex).toEqual(0)
    })

    it("does not regress: style", () => {
      const vnode = transform(<button style={{ fontWeight: "bold" }} />)
      expect(vnode.data.style.fontWeight).toEqual("bold")
    })

    it("does not regress: dataset", () => {
      const vnode = transform(<button dataset={{ fooBar: "baz" }} />)
      expect(vnode.data.dataset.fooBar).toEqual("baz")
    })

    it("does not regress: attributes", () => {
      const vnode = transform(<button attrs={{ tabindex: "0" }} />)
      expect(vnode.data.attrs.tabindex).toEqual("0")
    })

    it("does not regress: hooks", () => {
      const vnode = transform(<button hook={{ insert: noop }} />)
      expect(vnode.data.hook.insert).toEqual(noop)
    })

    it("does not regress: key", () => {
      const vnode = transform(<button key="test" />)
      expect(vnode.data.key).toEqual("test")
    })
  })
})
