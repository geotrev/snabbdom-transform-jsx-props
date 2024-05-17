import { jsx } from "snabbdom"
import {
  init,
  toVNode,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  attributesModule,
  datasetModule,
} from "snabbdom"
import { jsxPropsModule } from "../"

const patch = init([
  jsxPropsModule, // must be first
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  attributesModule,
  datasetModule,
])

function mount(baseNode, nextVnode) {
  const state = patch(baseNode, nextVnode)
  const wrapper = document.createElement("div")
  wrapper.id = "root"
  wrapper.appendChild(state.elm)
  document.body.appendChild(wrapper)
  return state
}

describe("DOM", () => {
  let baseNode

  beforeEach(() => {
    baseNode = toVNode(document.createElement("div"))
  })

  afterEach(() => {
    baseNode = null
    const wrapper = document.getElementById("root")
    if (wrapper) wrapper.parentNode.removeChild(wrapper)
  })

  describe("prefixes", () => {
    it("sets with 'attr-' prefix", () => {
      const { elm } = mount(baseNode, <button attr-type="button" />)
      expect(elm.getAttribute("type")).toEqual("button")
    })

    it("sets with prop- prefix", () => {
      const { elm } = mount(baseNode, <button prop-type="button" />)
      expect(elm.type).toEqual("button")
    })
  })

  describe("dataset props", () => {
    it("sets to dataset and data attribute", () => {
      const { elm } = mount(baseNode, <button data-foo-bar="baz" />)
      expect(elm.dataset.fooBar).toEqual("baz")
      expect(elm.getAttribute("data-foo-bar")).toEqual("baz")
    })
  })

  describe("generic props", () => {
    it("sets attribute to element", () => {
      const { elm } = mount(baseNode, <button aria-label="test" />)
      expect(elm.getAttribute("aria-label")).toEqual("test")
    })
  })

  describe("aliased props", () => {
    it("sets className to className property", () => {
      const { elm } = mount(baseNode, <button className="test" />)
      expect(elm.getAttribute("class")).toEqual("test")
    })

    it("sets class-name to className property", () => {
      const { elm } = mount(baseNode, <button class-name="test" />)
      expect(elm.getAttribute("class")).toEqual("test")
    })

    it("sets id to id property", () => {
      const { elm } = mount(baseNode, <button id="test" />)
      expect(elm.id).toEqual("test")
    })

    it("sets tabIndex to tabIndex property", () => {
      const { elm } = mount(baseNode, <button tabIndex={0} />)
      expect(elm.tabIndex).toEqual(0)
    })

    it("sets tab-index to tabIndex property", () => {
      const { elm } = mount(baseNode, <button tab-index={0} />)
      expect(elm.tabIndex).toEqual(0)
    })
  })

  describe("modules", () => {
    it("does not regress: event listeners", () => {
      const handler = jest.fn()
      const { elm } = mount(baseNode, <button on={{ click: handler }} />)
      elm.click()
      expect(handler).toHaveBeenCalled()
    })

    it("does not regress: class", () => {
      const { elm } = mount(baseNode, <button class={{ test: true }} />)
      expect(elm.classList.contains("test")).toBe(true)
    })

    it("does not regress: props", () => {
      const { elm } = mount(baseNode, <button props={{ tabIndex: 0 }} />)
      expect(elm.tabIndex).toEqual(0)
    })

    it("does not regress: style", () => {
      const { elm } = mount(baseNode, <button style={{ fontWeight: "bold" }} />)
      expect(elm.style.fontWeight).toEqual("bold")
    })

    it("does not regress: dataset", () => {
      const { elm } = mount(baseNode, <button dataset={{ fooBar: "baz" }} />)
      expect(elm.dataset.fooBar).toEqual("baz")
    })

    it("does not regress: attributes", () => {
      const { elm } = mount(baseNode, <button attrs={{ tabindex: "0" }} />)
      expect(elm.getAttribute("tabindex")).toEqual("0")
    })

    it("does not regress: hooks", () => {
      const handler = jest.fn()
      mount(baseNode, <button hook={{ insert: handler }} />)
      expect(handler).toHaveBeenCalled()
    })
  })
})
