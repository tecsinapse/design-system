<div align="center">

# TecSinapse Design System

[![Stars](https://img.shields.io/github/stars/tecsinapse/design-system?style=social)](https://github.com/tecsinapse/design-system/) [![License](https://img.shields.io/github/license/tecsinapse/design-system)](./LICENSE.md) [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.0-4baaaa.svg)](CODE_OF_CONDUCT.md)![build workflow](https://github.com/tecsinapse/design-system/actions/workflows/ci.yml/badge.svg)


[TecSinapse Design System](https://tecsinapse.github.io/design-system) is the hybrid implementation of the [TecSinapse](https://www.tecsinapse.com.br/) Design System. 
Our primary goal is to create a system that can be used to build a wide variety of TecSinapase websites and apps, while providing a consistent and inclusive user experience to our end users.
In addition, the design system and component library should be easy to use for developers and designers.

</div>

## Quick start

Here are a few helpful links for getting started with Circuit UI:

- [Documentation](https://tecsinapse.github.io/design-system) - Learn how to use and view the components in Storybook.
- [Getting started](https://tecsinapse.github.io/design-system/?path=/docs/introduction-getting-started--page) - Set up a new app with our DS or add it to an existing project.
- [Design Principles](https://tecsinapse.github.io/design-system/?path=/docs/introduction-design-principles--page) - Discover the guiding principles behind design.
- [Theming](https://tecsinapse.github.io/design-system/?path=/docs/advanced-theme--page) - Learn about our foundations such as colors, spacing, and typography.
- [Contribute](https://tecsinapse.github.io/design-system/?path=/docs/introduction-contributing--page) - File a bug report, suggest a change, or open a pull request.

## Packages

| Package                                                         | Content                                              | Version                                     |
| --------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------------- |
| **[@tecsinapse/react-core](./packages/react-core)**             | the core hybrid React component library              | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Freact-core.svg)](https://badge.fury.io/js/%40tecsinapse%2Freact-core) |
| **[@tecsinapse/react-web-kit](./packages/react-web-kit)**       | the React component library focused on web           | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Freact-web-kit.svg)](https://badge.fury.io/js/%40tecsinapse%2Freact-web-kit) |
| **[@tecsinapse/react-native-kit](./packages/react-native-kit)** | the React native component library focused on mobile | [![npm version](https://badge.fury.io/js/%40tecsinapse%2Freact-native-kit.svg)](https://badge.fury.io/js/%40tecsinapse%2Freact-native-kit) |

## Code of conduct

We want to foster an inclusive and friendly community around our Open Source efforts. This project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](./CODE_OF_CONDUCT.md).

If you feel another member of the community violated our code or you are experiencing problems participating in our community because of another individual's behavior, please get in touch with our maintainers.

## How to make local changes available for other projects?

At times, it may be necessary to test changes directly in a product, and not in the design system, and for this to work in a less laborious way, we can follow the steps below:

3 terminal tabs should open:
- In one run the JS code watch:
```
yarn build:watch
```
- In another run the watch of the TS code watch
```
yarn build:declarations:watch
```
- On another run yalc push (this script updates linked local projects)
```
yarn yalc:push
```

With that, all changes will be in yalc locally.

To access in your application, see this [example](https://github.com/tecsinapse/vendas-web-poc-playground#tools) in topic "**Yalc link Design System:**"


### Maintainers

- [Beatriz Silva](mailto:beatriz.silva@tecsinapse.com.br)
- [Denner Vidal](mailto:denner.vidal@tecsinapse.com.br)
- [Gabriel Sanches](mailto:gabriel.sanches@tecsinapse.com.br)
- [Lucas Ramos](mailto:lucas.ramos@tecsinapse.com.br)
- [Nilson Altonio](mailto:nilson.antonio@tecsinapse.com.br)
- [Ryan Correa](mailto:ryan.correa@tecsinapse.com.br)

## Contributing

If you have ideas for how we could improve this readme or the project in general, [let us know](https://github.com/tecsinapse/design-system/issues)!

## About TecSinapse

[TecSinapse](https://www.tecsinapse.com.br/) is a specialist in the automotive industry for over 15 years.
We operate with diverse integrated solutions, from client prospecting to after-sales, plus market indicators tools and process improvement for complete management.
