<h2 align="center">♻ snabbdom-transform-jsx-props</h2>
<p align="center">Adds shorthand prop syntax support for <a href="https://github.com/snabbdom/snabbdom">Snabbdom</a> JSX</p>
<br>
<p align="center">
  <a href="https://www.npmjs.com/package/snabbdom-transform-jsx-props"><img src="https://img.shields.io/npm/v/snabbdom-transform-jsx-props.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/snabbdom-transform-jsx-props"><img src="https://img.shields.io/npm/l/snabbdom-transform-jsx-props.svg?sanitize=true" alt="License"></a>
  <a href="https://www.npmjs.com/package/snabbdom-transform-jsx-props"><img src="https://badgen.net/circleci/github/geotrev/snabbdom-transform-jsx-props/main" alt="Circle CI status (main)" /></a>
  <a href="https://www.npmjs.com/package/snabbdom-transform-jsx-props"><img src="https://badgen.net/bundlephobia/minzip/snabbdom-transform-jsx-props" alt="bundle size" /></a>
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
  <div props={{ className: "my-component", dir: "ltr" }}>
    <h1 dataset={{ fooHeading: true }}>Hello world</h1>
    <p attrs={{ "aria-hidden": "true" }}>And good day</p>
    <a attrs={{ href: "#" }} props={{ tabIndex: 0 }}>
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
  <div className="my-component" prop-dir="ltr">
    <h1 data-foo-heading={true}>Hello world</h1>
    <p aria-hidden="true">And good day</p>
    <a href="#" tabIndex="0"></a>
  </div>
)
```

## Supported props

Note that this library does not support shorthands for all possible props. To be the most approachable without bloating the prop namespace, use either one of `prop-` or `attr-` prop prefixes.

### Module shorthands

| Prop pattern | Module         | Example                |
| ------------ | -------------- | ---------------------- |
| `hook-`      | Hooks          | `hook-insert={fn}`     |
| `on-`        | Event handlers | `on-click={fn}`        |
| `data-`      | Dataset        | `data-foo-bar={value}` |
| `attr-`      | Attributes     | `attr-role={value}`    |
| `prop-`      | Properties     | `prop-dir={value}`     |

### Attribute & property shorthands

| Prop pattern | Module     | Example              |
| ------------ | ---------- | -------------------- |
| `className`  | Properties | `className={value}`  |
| `id`         | Properties | `id={value}`         |
| `aria-`      | Attributes | `aria-label={value}` |
| `href`       | Attributes | `href={value}`       |
| `tabIndex`   | Attributes | `tabIndex={value}`   |
| `alt`        | Attributes | `alt={value}`        |
| `src`        | Attributes | `src={value}`        |
| `type`       | Attributes | `type={value}`       |

## Why

By default, Snabbdom `jsx` pragma won't apply most props unless you explicitly declare it in a [module object](https://github.com/snabbdom/snabbdom#modules-documentation) prop.

This makeshift module-driven prop signature is awkward for folks used to React-style props, which this library aims to mirror.

## Performance

To avoid excessive loops when scanning virtual nodes, this library intentionally has a limited prop scope. It focuses on the most used attributes/props. If you think there should be a specific prop or set of props that need special handling, feel free to make an issue.

This package also uses jest-bench for comparing implementations, if needed.
