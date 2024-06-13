# Contributing
Make sure to use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to keep a clear changelog, they are auto generated.

## Code of Conduct

We want to foster an inclusive and friendly community around our Open Source efforts. 
This project follows the Contributor Covenant Code of Conduct. Please, [read it and follow it](https://github.com/tecsinapse/design-system/tree/master/CODE_OF_CONDUCT.md).

If you feel another member of the community violated this code, or you are experiencing problems participating in our community because of another individual's behavior,
please get in touch with our [maintainers](mailto:devmobile@tecsinapse.com.br).

## Submitting an issue
In most cases, submitting an issue is the first step to contributing to our project. Check the existing issues and verify that your issue is not already submitted.

For TecSinapse members, keep in touch with the responsible team and checkout our backlog in the project management tool.

## Submitting a pull request

We appreciate pull requests (PRs) for smaller changes and bug fixes. For larger changes, we encourage you to [submit an issue](https://github.com/tecsinapse/design-system/issues/new) to collect feedback first. 
The normal workflow looks as follows:

1. Let others know that you're working on an issue by leaving a comment or assigning it to yourself.
2. Clone the repository (you might need to fork it first) and branch out from the latest `master` branch.
3. Code, add, commit, and push your changes in your feature branch.
4. Submit a pull request and make sure that the CI checks pass.
5. Collaborate with the codeowners/reviewers to merge your changes to `master`.

## Quick Start

### Prerequisites

- [Node.js v20](https://nodejs.org/)
- [pnpm 9](https://pnpm.io/pt/)

### Installation

- Run `pnpm i` in the repository's root directory to install everything you need for development.

### Available Scripts

All packages related to the design system are organized in this monorepo. 
Thanks to [`pnpm workspaces`](https://pnpm.io/pt/workspaces) packages that depend on each other always use the latest version. 
[`lerna`](https://lerna.js.org/) makes it possible to run scripts across all packages at the same time. 
The list of scripts below can be run in each package directory individually, or in the repository's root directory for all packages at once.

- `pnpm build` — will build packages once
- `pnpm lint` — will lint the code once
- `pnpm storybook` — will run the [Storybook](https://tecsinapse.github.io/design-system) in development mode

Refer to the `package.json` files in each package for other helpful scripts.

### Troubleshooting

**Changes in one package aren't recognized in another package**

You need to run `pnpm dev` to keep [rollup bundler](https://rollupjs.org/) in the watch mode.
