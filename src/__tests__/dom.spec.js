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
import { transform } from "../"

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  attributesModule,
  datasetModule,
])

function mount(vnode, nextVnode) {
  const state = patch(vnode, transform(nextVnode))
  document.body.appendChild(state.elm)
  return state.elm
}

describe("DOM", () => {
  let vnode

  beforeEach(() => {
    vnode = toVNode(document.createElement("div"))
  })
  
  afterEach(() => {
    vnode = null
    document.body.removeChild(document.body.firstElementChild)
  })

  describe("attr prefix", () => {
    it("sets type attribute with 'attr-' prefix", () => {
      const fixture = mount(vnode, <button attr-type='button' />)
      expect(fixture.getAttribute("type")).toEqual("button")
    })
  })

  describe("prop prefix", () => {
    it("sets to html dom property", () => {
      const fixture = mount(vnode, <button attr-type='button' />)
      expect(fixture.getAttribute("type")).toEqual("button")
    })
  })

  describe("dom property props", () => {
    it("sets className to className property", () => {
      const fixture = mount(vnode, <button className="test" />)
      expect(fixture.getAttribute("class")).toEqual("test")
    })
    it("sets class-name to className property", () => {
      const fixture = mount(vnode, <button class-name="test" />)
      expect(fixture.getAttribute("class")).toEqual("test")
    })
    it("sets id to id property", () => {
      const fixture = mount(vnode, <button id="test" />)
      expect(fixture.id).toEqual("test")
    })
    it("sets tabIndex to tabIndex property", () => {
      const fixture = mount(vnode, <button tabIndex={0} />)
      expect(fixture.tabIndex).toEqual(0)
    })
    it("sets tab-index to tabIndex property", () => {
      const fixture = mount(vnode, <button tab-index={0} />)
      expect(fixture.tabIndex).toEqual(0)
    })
  })
  
  describe("dataset props", () => {
    it("sets to dataset and data attribute", () => {
      const fixture = mount(vnode, <button data-foo-bar="baz" />)
      expect(fixture.dataset.fooBar).toEqual("baz")
      expect(fixture.getAttribute("data-foo-bar")).toEqual("baz")
    })
  })

  describe("generic props", () => {
    it("sets attribute to element", () => {
      const fixture = mount(vnode, <button aria-label="test" />)
      expect(fixture.getAttribute("aria-label")).toEqual("test")
    })
  })
})
