# Changelog - @inertiajs-revamped/react

## 0.1.0 (2024-04-18)

### Bug Fixes

- add missing type `exports` for multiple un-exported types ([33a8fa9](https://github.com/inertiajs-revamped/inertia/commit/33a8fa9))
- check for `undefined` `render` in `createInertiaApp()`, fixes ts(2722) ([74016ed](https://github.com/inertiajs-revamped/inertia/commit/74016ed))
- add missing `resolveComponent` type in `createInertiaApp()`, fixes ts(7006) ([fa98f18](https://github.com/inertiajs-revamped/inertia/commit/fa98f18))
- add missing `head` type in `createInertiaApp()`, fixes multiple ts(7034) ([bb22517](https://github.com/inertiajs-revamped/inertia/commit/bb22517))
- change `key` initial value to `-1` in app.ts, fixes ts(2345) ([9756ab1](https://github.com/inertiajs-revamped/inertia/commit/9756ab1))
- memoize transform to fix `useForm()` bug (based on [inertia/pull/1718](inertiajs/inertia#1718)) ([8f9d987](https://github.com/inertiajs-revamped/inertia/commit/8f9d987))
- add missing generic for `useForm()` `cancelToken`, fixes multiple ts(2322) ([5861bec](https://github.com/inertiajs-revamped/inertia/commit/5861bec))
- add missing generic for `useForm()` `recentlySuccessfulTimeoutId`, fixes multiple ts(2769) ([786f413](https://github.com/inertiajs-revamped/inertia/commit/786f413))
- add missing `visit` parameter for `useForm().onFinish()`, fixes ts(2554) ([ae22230](https://github.com/inertiajs-revamped/inertia/commit/ae22230))
- add missing generic for `useForm()` `progress`, fixes ts(2345) ([9463079](https://github.com/inertiajs-revamped/inertia/commit/9463079))
- add missing types for `useForm()` submit callback parameters, fixes multiple ts(7006) ([dd75747](https://github.com/inertiajs-revamped/inertia/commit/dd75747))
- fix `useForm()` `isMounted` initial value to `false`, fixes ts(2322) ([121b2b2](https://github.com/inertiajs-revamped/inertia/commit/121b2b2))
- add type annotation to router, omits default-wildcard `core` import from d.ts bundle ([02ce58d](https://github.com/inertiajs-revamped/inertia/commit/02ce58d))
- add type annotation to explicitly specify the type of `<Link>`, omits default-wildcard `React` import from d.ts bundle ([bca76fa](https://github.com/inertiajs-revamped/inertia/commit/bca76fa))
- fix `onCancelToken` type in link.ts ([48d190a](https://github.com/inertiajs-revamped/inertia/commit/48d190a))
- add missing type `export` for `BaseInertiaLinkProps` ([7437f4f](https://github.com/inertiajs-revamped/inertia/commit/7437f4f))
- remove line breaks in link.ts warn, fixes minified bundle mess ([b0d20f9](https://github.com/inertiajs-revamped/inertia/commit/b0d20f9))
- use native events in link.ts to ensure compability with `instanceof`, fixes ts(7006) ([3184668](https://github.com/inertiajs-revamped/inertia/commit/3184668))
- remove useless rename of `default` export in server.ts ([b461fd2](https://github.com/inertiajs-revamped/inertia/commit/b461fd2))
- omit default-wildcard `React` import from `d.ts` bundle by removing all default `React` imports ([ed7de67](https://github.com/inertiajs-revamped/inertia/commit/ed7de67))
- replace default `React` imports with named imports in link.ts ([0899a77](https://github.com/inertiajs-revamped/inertia/commit/0899a77))
- replace default `React` import with named in head.ts ([b46e225](https://github.com/inertiajs-revamped/inertia/commit/b46e225))
- ensure that all imports used only as a type use a type-only `import` ([6ae2d05](https://github.com/inertiajs-revamped/inertia/commit/6ae2d05))

### Code Refactoring

- improve & export `InertiaHeadProps` & `InertiaHead` types ([bdb1aab](https://github.com/inertiajs-revamped/inertia/commit/bdb1aab))
- remove deprecated `useRememberedState()` ([3dcc6d0](https://github.com/inertiajs-revamped/inertia/commit/3dcc6d0))

### Features

- add aria-role for non anchor `<Link>` tags (based on [inertia/pull/1762](inertiajs/inertia#1762)) ([32ade50](https://github.com/inertiajs-revamped/inertia/commit/32ade50))
- check `as`, before convert to lowercase (based on [inertia/pull/1297](inertiajs/inertia#1297)) ([93d878f](https://github.com/inertiajs-revamped/inertia/commit/93d878f))
