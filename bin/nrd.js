const nrd = require('../');

let args = process.argv.slice(2);

let options = require('argly').createParser({
  '--help': {
    type: 'string',
    description: 'Show this help message'
  },
  '--dir -d': {
    type: 'string',
    description: 'Directory to download the module into (defaults to current directory)',
    defaultValue: process.cwd()
  },
  '--tag -t': {
    type: 'string',
    description: 'A version tag to download (defaults to latest)'
  },
  '--version -v': {
    type: 'string',
    description: 'The version to download from npm'
  },
  '--untar -u': {
    type: 'boolean',
    description: 'Whether the registry file should be untarred or not (defaults to true)',
    defaultValue: true
  },
  '--module -m *': {
    type: 'string',
    description: 'npm module name'
  }
})
.usage('Usage: $0 [options]')
.example(
  'Download an npm module to a specific directory',
  'nrd express --dir /Users/me/Desktop')
.example(
  'Download a module from npm using a specific version',
  'nrd express --version 4.14.1')
.example(
  'Download a module from npm using a specific tag',
  'nrd express --tag beta')
.validate(function (result) {
  if (!result.module || result.help) {
    this.printUsage();
    process.exit(0);
  }
})
.onError(function (err) {
  this.printUsage();
  console.error(err);
  process.exit(1);
})
.parse(args);

const {
  tag,
  version,
  untar,
  dir
} = options;

const moduleName = options.module;

nrd.download(moduleName, {
  tag,
  version,
  untar,
  dir
}).then(() => {
  console.log(`Successfully downloaded module "${moduleName}" to directory "${dir}"`);
}).catch((err) => {
  console.log(`Error downloading module "${moduleName}" to directory "${dir}"`, err);
});
