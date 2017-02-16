# nrd

Download an [npm](https://www.npmjs.com/) registry package tar file directly.
`nrd` is short for **npm registry download**. It is also for `nerds`.

### Install

```bash
npm install nrd --save
```

`nrd` also comes packaged with a command line utility enabling you to download
a package from npm to any specific directory from the command line. **You
obviously need it.** You can install `nrd` globally with:

```
npm install nrd -g
```

### Usage:

Download a package to the current directory and decompress the tar:

```js
const nrd = require('nrd');

nrd.download('express');
```

Download a package to a specific directory and decompress the tar:

```js
const nrd = require('nrd');

nrd.download('express', {
  dir: '/Users/me/Desktop'
});
```

Download a specific version of a package:

```js
const nrd = require('nrd');

nrd.download('express', {
  dir: '/Users/me/Desktop',
  version: "4.13.1"
});
```

### Options

Available options:

```js
const nrd = require('nrd');

nrd.download('express', {
  ...
});
```

- tag {String} - A version tag to download (defaults to `latest`)
- version {String} - The version to download from npm
- dir {String} - Directory to download the file to (default to current directory)
- untar {Boolean} - Whether the registry file should be untarred or not (defaults to `true`)

### CLI

`nrd` comes packaged with a **fantastic** command line utility. Trust me, I
created it. Options for the CLI are the same as the options listed for the API.

Download a package to the current directory and decompress the tar:

```bash
nrd express
```

Download a package to a specific directory and decompress the tar:

```bash
nrd express --dir /Users/me/Desktop
```
