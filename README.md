# eslint-config-kwork

> ⚠️ **DEPRECATED**: This package is no longer maintained and will not receive any further updates. Please migrate to alternative ESLint configurations.

ESLint configs for KnowledgeWork's projects.

## Usage

### Install

```sh
$ npm install --save-dev eslint-config-kwork
```

### eslintrc

Like followings

```eslintrc
  ~~~
  ~~~
  extends: [
    "kwork/base",
    "prettier"
  ],
  ~~~
  ~~~
```

Currently kwork has 2 configs.

- `kwork/base`
  - common configs (without settings for frontend (e.g. for react))
- `kwork/frontend`
  - configs for frontend projects.
