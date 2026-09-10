# rn-playground

Please follow
the [React native environment setup](https://reactnative.dev/docs/set-up-your-environment?os=linux&platform=android).
This package is a sample React Native application with all required dependencies. In
the [repository docs](https://tecsinapse.github.io/design-system)
you will find all steps to start your application.

After you configure the SDK and emulator (or your device), you can run the platform command to build and run the
playground app locally.
It will be used android as example.

```shell
pnpm android
```

This will run the CNG prebuild, compile a native development build (first build is slow — Gradle downloads and compiles
all native modules) and start Metro.

If you already have a development build installed, just run `pnpm run:dev` to start Metro and iterate fast (reload
with `r` in the Metro terminal). `pnpm dev:android` regenerates stories and starts Metro without rebuilding.

For iOS, run `pnpm ios` on macOS (requires Xcode). Expo Go is not available for SDK 57 — use the development builds
above.

Please follow same directives of the root directory (run `pnpm dev`) to watch file changes.

Run `pnpm storybook` for the Storybook on-device dev server.
