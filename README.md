# nrd

Download an [npm](https://www.npmjs.com/) registry package tar file directly.
`nrd` is short for **npm registry download**. It is also for `nerds`. `nrd` is
useful for easily inspecting source code of modules **and** creating project
scaffolds. Instead of creating a repo that has a template folder inside of it
and copying files over, a project can be versioned, and directly downloaded from
npm into a project without dependency resolution issues. For example:

```bash
# Downloads my scaffold project from npm and renames it to `myapp`
my-cli-using-nrd create myapp

# Other examples
marko create myapp
create-react-app myapp
ember new myapp
ng new myapp
```

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
- registry {String} - Change the remote npm registry to use (defaults to https://registry.npm.org).

### CLI

`nrd` comes packaged with a **fantastic** command line utility. Trust me, I
created it.

Download a package to the current directory and decompress the tar:

```bash
nrd express
```

Download a package to a specific directory and decompress the tar:

```bash
nrd express --dir /Users/me/Desktop
```

### CLI Help / Options

Running `nrd --help` will give you all of the information you need!

```bash
[master] $ nrd --help
Usage: nrd [options]

Examples:

  Download an npm module to a specific directory:
     nrd express --dir /Users/me/Desktop

  Download a module from npm using a specific version:
     nrd express --version 4.14.1

  Download a module from npm using a specific tag:
     nrd express --tag beta

Options:

  --help Show this help message [string]

  --dir -d Directory to download the module into (defaults to current directory) [string]

  --tag -t A version tag to download (defaults to latest) [string]

  --version -v The version to download from npm [string]

  --untar -u Whether the registry file should be untarred or not (defaults to true) [boolean]

  --registry -r Change the remote npm registry to use (defaults to https://registry.npm.org) [string]

  --module -m * npm module name [string]
```
