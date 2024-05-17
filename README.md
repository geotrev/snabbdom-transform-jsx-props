<h2 align="center">♻ snabbdom-transform-jsx-props</h2>
<p align="center">Adds React-style prop support for <a href="https://github.com/snabbdom/snabbdom">Snabbdom</a> JSX</p>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/snabbdom-transform-jsx-props"><img src="https://img.shields.io/npm/v/snabbdom-transform-jsx-props.svg?sanitize=true&style=flat-square" alt="Version"></a>
  <a href="https://github.com/geotrev/snabbdom-transform-jsx-props/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/snabbdom-transform-jsx-props.svg?sanitize=true&style=flat-square" alt="License"></a>
  <a href="https://github.com/geotrev/snabbdom-transform-jsx-props/actions/workflows/test.yml?query=branch%3Amain"><img src="https://badgen.net/github/checks/geotrev/snabbdom-transform-jsx-props/main?style=flat-square" alt="CI status" /></a>
  <a href="https://bundlephobia.com/package/snabbdom-transform-jsx-props"><img src="https://badgen.net/bundlephobia/minzip/snabbdom-transform-jsx-props?style=flat-square" alt="bundle size" /></a>
  <a href="https://www.libraries.io/npm/snabbdom-transform-jsx-props"><img src="https://img.shields.io/librariesio/release/npm/snabbdom-transform-jsx-props" alt="dependency status" /></a>
</p>

- [Install](#install)
- [Usage](#usage)
- [Supported props](#supported-props)
  - [Module shorthands](#module-shorthands)
  - [Aliased shorthands](#aliased-shorthands)
- [Why](#why)
- [Performance](#performance)

## Install

**NPM**

```sh
$ npm i snabbdom snabbdom-transform-jsx-props
```

## Usage

Add the `jsxDomPropsModule` export to snabbdom's `init` function. **It must be the first module.**

```js
import { classModule, styleModule } from "snabbdom"
import { jsxDomPropsModule } from "snabbdom-transform-jsx-props"

const patch = init([jsxDomPropsModule, classModule, styleModule])
```

This module is intended for _web-related_ use-cases when paired with the Snabbdom package. This means non-web environments, like mobile apps and the like, are not guaranteed to work.

The below example demonstrates the new JSX prop signature when using this module:

**Vanilla Snabbdom JSX:**

```jsx
<div props={{ className: "my-component" }} hook={{ insert: () => {} }}>
  <h1 dataset={{ fooHeading: true }}>Hello world</h1>
  <p attrs={{ "aria-hidden": "true" }}>And good day</p>
  <a
    attrs={{ href: "#", style: "color: blue" }}
    props={{ tabIndex: 0 }}
    on={{ click: () => {} }}
  >
    Try me!
  </a>
</div>
```

**With this package:**

```jsx
<div className="my-component" hook-insert={() => {}}>
  <h1 data-foo-heading={true}>Hello world</h1>
  <p aria-hidden="true">And good day</p>
  <a href="#" attr-style="color: blue" tabIndex="0" on-click={() => {}}></a>
</div>
```

The key difference is you will no longer need a module object to add props. They are automatically added for you (unless you specify the module [with a prefix](#module-shorthands)), plus property/attribute props fall back to DOM attributes by default.

## API

### Module shorthands

Specifying a Snabbdom module will direct this plugin on how to use the prop.

| Prop pattern | Module         | Example                |
| ------------ | -------------- | ---------------------- |
| `hook-`      | Hooks          | `hook-insert={fn}`     |
| `on-`        | Event handlers | `on-click={fn}`        |
| `data-`      | Dataset        | `data-foo-bar={value}` |
| `attr-`      | Attributes     | `attr-role={value}`    |
| `prop-`      | Properties     | `prop-dir={value}`     |

### Aliased property shorthands

These are alternate names for common props. They are always treated as DOM properties, which reflect to their respective attributes.

| Prop pattern | Alias for   | Example              |
| ------------ | ----------- | -------------------- |
| `className`  |             | `className={value}`  |
| `class-name` | `className` | `class-name={value}` |
| `tabIndex`   |             | `tabIndex={value}`   |
| `tabindex`   | `tabIndex`  | `tabindex={value}`   |
| `tab-index`  | `tabIndex`  | `tab-index={value}`  |

## Why

By default, Snabbdom `jsx` pragma doesn't handle any prop not declared it in a [module](https://github.com/snabbdom/snabbdom#modules-documentation).

While functional and concise, this module-driven prop signature is awkward given the prevalent of HTML-like JSX prop signatures.

## Performance

Like Snabbdom itself, a top priority of this module is performance. As a result, it runs linearly by detecting modules present in a given vnode, then going over the props themselves. This allows specific application of certain props to their appropriate module, then immediately iterating to the next prop.

Like all code, I wouldn't claim this to be perfect, so contributions are welcome if you suspect improvements can be made.
