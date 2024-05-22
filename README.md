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
- [Features](#features)
- [Why](#why)
- [Performance](#performance)

## Install

**NPM**

```sh
$ npm i snabbdom snabbdom-transform-jsx-props
```

## Usage

Add the `jsxPropsModule` export to Snabbdom's `init` function. **It must be the first module** as the JSX props will be forwarded to the appropriate Snabbdom module object.

```js
import { classModule, styleModule } from "snabbdom"
import { jsxPropsModule } from "snabbdom-transform-jsx-props"

const patch = init([jsxPropsModule, classModule, styleModule])
```

The below example demonstrates the new JSX prop signature when using this module:

**Vanilla JSX:**

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

**With `jsxPropsModule`:**

```jsx
<div className="my-component" hook-insert={() => {}}>
  <h1 data-foo-heading={true}>Hello world</h1>
  <p aria-hidden="true">And good day</p>
  <a href="#" attr-style="color: blue" tabIndex="0" on-click={() => {}}></a>
</div>
```

## Features

At its core, this module forwards _most_ props to the [attributes](https://github.com/snabbdom/snabbdom?tab=readme-ov-file#the-attributes-module) module. Otherwise, here's what to expect:

- `key` prop is left as-is
- All [module props](https://github.com/snabbdom/snabbdom?tab=readme-ov-file#modules-documentation) are unaffected (to prevent regressions on vanilla behavior)
- Some props, such as `className` or `tabIndex`, are always moved to the props module to be set as DOM properties
- Shorthands (prefixed module props) can be used to direct a JSX prop into a specific module. This flattens props (useful for hooks and listeners especially). These are the supported module prefixes:

  | Prop pattern | Module         | Example                  |
  | ------------ | -------------- | ------------------------ |
  | `hook-`      | Hooks          | `hook-insert={() => {}}` |
  | `on-`        | Event handlers | `on-click={() => {}}`    |
  | `data-`      | Dataset        | `data-el-id="123"`       |
  | `attrs-`     | Attributes     | `attrs-role="region"`    |
  | `props-`     | Properties     | `props-dir="rtl`         |

## Why

By default, Snabbdom won't handle attributes/properties unless declared in a [module](https://github.com/snabbdom/snabbdom#modules-documentation) object. While functional and concise, that module-driven prop signature is awkward given the prevalence of HTML-like JSX prop signatures in tools like React.

This module aims to improve that developer experience while retaining the great performance already present in Snabbdom.

## Performance

Like Snabbdom itself, a top priority of this module is performance. As a result, it runs linearly by detecting modules present in a given vnode, then going over the props themselves. This allows specific application of certain props to their appropriate module, then immediately iterating to the next prop.

Like all code, I wouldn't claim this to be perfect, so contributions are welcome if you suspect improvements can be made.
