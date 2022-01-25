<h2 align="center">♻ snabbdom-transform-jsx-props</h2>
<p align="center">Adds shorthand prop syntax support for <a href="https://github.com/snabbdom/snabbdom">Snabbdom</a> JSX</p>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/snabbdom-transform-jsx-props"><img src="https://img.shields.io/npm/v/snabbdom-transform-jsx-props.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/snabbdom-transform-jsx-props"><img src="https://img.shields.io/npm/l/snabbdom-transform-jsx-props.svg?sanitize=true" alt="License"></a>
  <a href="https://app.circleci.com/pipelines/github/geotrev/snabbdom-transform-jsx-props?branch=main"><img src="https://badgen.net/circleci/github/geotrev/snabbdom-transform-jsx-props/main" alt="Circle CI status (main)" /></a>
  <a href="https://bundlephobia.com/package/snabbdom-transform-jsx-props@0.1.0"><img src="https://badgen.net/bundlephobia/minzip/snabbdom-transform-jsx-props" alt="bundle size" /></a>
  <a href="https://www.libraries.io/npm/snabbdom-transform-jsx-props"><img src="https://img.shields.io/librariesio/release/npm/snabbdom-transform-jsx-props" alt="dependency status" /></a>
</p>

- [Install](#install)
- [Usage](#usage)
- [Supported props](#supported-props)
  - [Module shorthands](#module-shorthands)
  - [Attribute & property shorthands](#attribute--property-shorthands)
- [Why](#why)

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
    <a attrs={{ href: "#" }} props={{ tabIndex: 0 }} on={{ click: fn }}>
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
    <a href="#" tabIndex="0" on-click={fn}></a>
  </div>
)
```

## Supported props

All props are supported as shorthand.

### Module shorthands

| Prop pattern | Module         | Example                |
| ------------ | -------------- | ---------------------- |
| `hook-`      | Hooks          | `hook-insert={fn}`     |
| `on-`        | Event handlers | `on-click={fn}`        |
| `data-`      | Dataset        | `data-foo-bar={value}` |
| `attr-`      | Attributes     | `attr-role={value}`    |
| `prop-`      | Properties     | `prop-dir={value}`     |

### Property shorthands

| Prop pattern | Alias for   | Example              |
| ------------ | ----------- | -------------------- |
| `className`  |             | `className={value}`  |
| `class-name` | `className` | `class-name={value}` |
| `id`         |             | `id={value}`         |
| `tabIndex`   |             | `tabIndex={value}`   |
| `tabindex`   | `tabIndex`  | `tabIndex={value}`   |
| `tab-index`  | `tabIndex`  | `tab-index={value}`  |

With the exception of property shorthands above, any JSX prop you set is automatically forwarded to Snabbdom's Attributes module. That said, you can instruct this plugin to set any property as an attribute, or vice versa. To do so, prepend `prop-` or `attr-` to the prop.

Example:

```jsx
<button attr-tabindex="0" attr-onclick="click(event)" />
<input prop-click="click(event)" prop-value={someValue} />
```

## Why

By default, Snabbdom `jsx` pragma won't apply most props unless you explicitly declare it in a [module object](https://github.com/snabbdom/snabbdom#modules-documentation) prop.

This makeshift module-driven prop signature is awkward for folks used to React-style props, which this library aims to mirror.

## Performance

This package also uses jest-bench for comparing implementations, if needed.
