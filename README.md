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
  - [Generic shorthands](#generic-shorthands)
  - [Attribute & property shorthands](#attribute--property-shorthands)
- [Why](#why)

## Install

**NPM**

```sh
$ npm i snabbdom snabbdom-transform-jsx-props
```

## Usage

Use the utility on any Snabbdom vnode created using its `jsx` pragma.

As an example, the below examples result in an identical vnode structure.

```jsx
import { jsx } from "snabbdom"
import { transformJsx } from "snabbdom-transform-jsx-props"

/* Before */
const vanilla = (
  <div props={{ className: "my-component", dir: "ltr" }}>
    <h1 dataset={{ fooHeading: true }}>Hello world</h1>
    <p attrs={{ "aria-hidden": "true" }}>And good day</p>
    <a attrs={{ href: "#" }} props={{ tabIndex: 0 }}>
      Try me!
    </a>
  </div>
)

/* After */
const transformed = transformJsx(
  <div className="my-component" prop-dir="region">
    <h1 data-foo-heading={true}>Hello world</h1>
    <p aria-hidden="true">And good day</p>
    <a href="#" tabIndex="0"></a>
  </div>
)
```

## Supported props

Note that this library does not support shorthands for all possible props. To be the most approachable without bloating the prop namespace, use either one of `prop-` or `attr-` prop prefixes.

### Generic shorthands

| Prop pattern | Module         | Example                |
| ------------ | -------------- | ---------------------- |
| `/^hook-/`   | Hooks          | `hook-insert={fn}`     |
| `/^on-/`     | Event handlers | `on-click={fn}`        |
| `/^data-/`   | Dataset        | `data-foo-bar={value}` |
| `/^attr-/`   | Attributes     | `attr-href={value}`    |
| `/^prop-/`   | Properties     | `prop-dir={value}`     |

### Attribute & property shorthands

| Prop pattern    | Module     | Example              |
| --------------- | ---------- | -------------------- |
| `/^aria-/`      | Attributes | `aria-label={value}` |
| `/^className$/` | Properties | `className={value}`  |
| `/^id$/`        | Properties | `id={value}`         |
| `/^href$/`      | Attributes | `href={value}`       |
| `/^tabIndex$/`  | Attributes | `tabIndex={value}`   |
| `/^alt$/`       | Attributes | `alt={value}`        |
| `/^src$/`       | Attributes | `src={value}`        |
| `/^type$/`      | Attributes | `type={value}`       |

## Why

Snabbdom's built-in `jsx` pragma doesn't interpret your props by applying them to the appropriate module. Instead, Snabbdom requires you to specify these modules by having you set them as props directly on a given element.

This makeshift module-driven prop signature is awkward for folks used to React-style props, which this library aims to mirror.

## How the transformer works

By default, the Snabbdom `jsx` pragma shovels all unsupported vnode props into `vnode.data`. It won't apply these props because they aren't in one of [Snabbdom's modules](https://github.com/snabbdom/snabbdom#modules-documentation), as stated above.

This library detects specific prop shorthands and moves them to the appropriate Snabbdom-supported module so your Snabbdom can process all your props.

## Performance

To avoid excessive loops when scanning virtual nodes, this library intentionally has a limited prop scope. It focuses on the most used attributes/props. If you think there should be a specific prop or set of props that need special handling, feel free to make an issue.

This package also uses jest-bench for comparing implementations, if needed.
