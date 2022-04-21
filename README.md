# eslint-config-kwork

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
