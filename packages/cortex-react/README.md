# TecSinapse Design System

[![build workflow](https://github.com/tecsinapse/design-system/actions/workflows/publish.yml/badge.svg)](https://github.com/tecsinapse/design-system/actions/workflows/publish.yml)

Welcome to [TecSinapse](https://www.tecsinapse.com.br/) Design System. This repo contains core components to build web and mobile applications.
Our primary goal is to create a system that can be used to build a wide variety of TecSinapse websites and apps,
while providing a consistent and inclusive user experience to our end users.
In addition, the design system and component library should be easy to use for developers and designers.

## Quick start

Please refer to the official [documentation](https://tecsinapse.github.io/design-system).

## Packages

| Package                                                         | Content                                                                          | Version                                                                                                                                    |
| --------------------------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **[@tecsinapse/react-core](./packages/react-core)**             | core primitives for `CSS-in-JS` packages                                         | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Freact-core.svg)](https://badge.fury.io/js/%40tecsinapse%2Freact-core)             |
| **[@tecsinapse/react-web-kit](./packages/react-web-kit)**       | emotion `styled-components` for browsers with `react-native-web`                 | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Freact-web-kit.svg)](https://badge.fury.io/js/%40tecsinapse%2Freact-web-kit)       |
| **[@tecsinapse/react-native-kit](./packages/react-native-kit)** | emotion native `styled-components` for `react-native` cross platform development | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Freact-native-kit.svg)](https://badge.fury.io/js/%40tecsinapse%2Freact-native-kit) |
| **[@tecsinapse/react-charts](./packages/react-charts)**         | charts for react & react-native based on SVG                                     | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Freact-charts.svg)](https://badge.fury.io/js/%40tecsinapse%2Freact-charts)         |
| **[@tecsinapse/cortex-core](./packages/cortex-core)**           | core primitives for `tailwindcss` packages                                       | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Fcortex-core.svg)](https://badge.fury.io/js/%40tecsinapse%2Fcortex-core)           |
| **[@tecsinapse/cortex-react](./packages/cortex-react)**         | `html` based components using `cortex-core` primitives                           | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Fcortex-react.svg)](https://badge.fury.io/js/%40tecsinapse%2Fcortex-react)         |

## Code of conduct

We want to foster an inclusive and friendly community around our Open Source efforts. This project follows the Contributor Covenant Code of Conduct.
Please, [read it and follow it](./CODE_OF_CONDUCT.md).

If you feel another member of the community violated our code or you are experiencing problems participating in our community because of another individual's behavior,
please get in touch with our maintainers.

## Running locally

Recommended requirements:

- `pnpm` >= 9
- `node` >= 20

To run locally, you should install the dependencies first:

```
pnpm i
```

After this script, all packages will build. When developing, for a better experience, also use:

```
pnpm dev
```

This script watch for changes on any package and rebuild files to reflect on live mode. To run storybook with all components, use:

```
pnpm storybook
```

For web development this is sufficient. For mobile, follow additional steps on [rn-playground](./packages/rn-playground).

## How to make local changes available for other projects?

Check [these docs](https://pnpm.io/cli/link).

## Contributing

If you have ideas for how we could improve this readme or the project in general, [let us know](https://github.com/tecsinapse/design-system/issues)!

## About TecSinapse

[TecSinapse](https://www.tecsinapse.com.br/) is a specialist in the automotive industry for over 15 years.
We operate with diverse integrated solutions, from client prospecting to after-sales, plus market indicators tools and process improvement for complete management.\_
