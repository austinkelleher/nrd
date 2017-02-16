# nrd

Download an [npm](https://www.npmjs.com/) registry package tar file directly.
`nrd` is short for **npm registry download**. It is also for `nerds`.

### Install

```bash
npm install nrd --save
```

### Install Globally

```bash
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
