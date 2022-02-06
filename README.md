<h2 align="center">♻ snabbdom-transform-jsx-props</h2>
<p align="center">Adds full prop syntax support for <a href="https://github.com/snabbdom/snabbdom">Snabbdom</a> JSX</p>
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

Import the `transform` function from this package and use it on Snabbdom JSX.

The below JSX example results in an identical virtual node structure.

**Before:**

```jsx
import { jsx } from "snabbdom"

const node = (
  <div props={{ className: "my-component" }} hook={{ insert: fn }}>
    <h1 dataset={{ fooHeading: true }}>Hello world</h1>
    <p attrs={{ "aria-hidden": "true" }}>And good day</p>
    <a
      attrs={{ href: "#", style: "color: blue" }}
      props={{ tabIndex: 0 }}
      on={{ click: fn }}
    >
      Try me!
    </a>
  </div>
)
```

**After:**

```jsx
import { jsx } from "snabbdom"
import { transform } from "snabbdom-transform-jsx-props"

const node = transform(
  <div className="my-component" hook-insert={fn}>
    <h1 data-foo-heading={true}>Hello world</h1>
    <p aria-hidden="true">And good day</p>
    <a href="#" attr-style="color: blue" tabIndex="0" on-click={fn}></a>
  </div>
)
```

## API

Any prop can be used at the top level.

### Module shorthands

Declare a Snabbdom module prop without using the object syntax.

| Prop pattern | Module         | Example                |
| ------------ | -------------- | ---------------------- |
| `hook-`      | Hooks          | `hook-insert={fn}`     |
| `on-`        | Event handlers | `on-click={fn}`        |
| `data-`      | Dataset        | `data-foo-bar={value}` |
| `attr-`      | Attributes     | `attr-role={value}`    |
| `prop-`      | Properties     | `prop-dir={value}`     |

Worth noting is that you can set any prop, HTML attribute, or dom property to either the attributes or properties module by prefixing the name with `attr-` and `prop-`, respectively.

### Aliased shorthands

These are alternate names for common props.

| Prop pattern | Alias for   | Example              |
| ------------ | ----------- | -------------------- |
| `className`  |             | `className={value}`  |
| `class-name` | `className` | `class-name={value}` |
| `tabIndex`   |             | `tabIndex={value}`   |
| `tabindex`   | `tabIndex`  | `tabIndex={value}`   |
| `tab-index`  | `tabIndex`  | `tab-index={value}`  |

## Why

By default, Snabbdom `jsx` pragma won't apply any prop unless you explicitly declare it in a [module object](https://github.com/snabbdom/snabbdom#modules-documentation).

While functional, this module-driven prop signature is awkward for JSX as most develoeprs expect props to be written somewhat like HTML.

## Performance

This package uses jest-bench for comparing implementations.
