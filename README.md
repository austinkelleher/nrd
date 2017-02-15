# npm-registry-download

Download an [npm](https://www.npmjs.com/) registry package tar file directly

### Install

```bash
npm install npm-registry-download --save
```

### Usage:

Download a package to the current directory and decompress the tar:

```js
const registryDownload = require('npm-registry-download');

registryDownload('express');
```

Download a package to a specific directory and decompress the tar:

```js
const registryDownload = require('npm-registry-download');

registryDownload('express', {
  dir: '/Users/me/Desktop'
});
```

### Options

Available options:

```js
const registryDownload = require('npm-registry-download');

registryDownload('express', {
  ...
});
```

- tag {String} - A version tag to download (defaults to `latest`)
- version {String} - The version to download from npm
- dir {String} - Directory to download the file to (default to current directory)
- untar {Boolean} - Whether the registry file should be untarred or not (defaults to `true`)
