'use strict';

const fs = require('fs');
const targz = require('tar.gz2');
const path = require('path');
const request = require('superagent');

const BASE_REGISTRY_URL = 'https://registry.npmjs.org/';
const DEFAULT_RESPONSE_TIMEOUT = 5000;
const DEFAULT_DEADLINE_TIMEOUT = 10000;

function _fetchRegistryData (packageName) {
  const registryUrl = BASE_REGISTRY_URL + packageName;
  return request
    .get(registryUrl)
    .type('json')
    .timeout({
      response: DEFAULT_RESPONSE_TIMEOUT,
      deadline: DEFAULT_DEADLINE_TIMEOUT
    });
}

function _resolveRegistryVersion (body, tag, version) {
  if (tag) {
    let distVersion = body['dist-tags'][tag];
    version = body.versions[distVersion];
    if (!distVersion || !version) {
      throw new Error(`Invalid tag '${tag}' provided.`);
    }
  } else if (version) {
    version = body.versions[version];
    if (!version) {
      throw new Error(`Invalid version ${version} provided`);
    }
  } else {
    let distVersion = body['dist-tags'].latest;
    version = body.versions[distVersion];
  }
  return version;
}

exports.download = (packageName, options) => {
  let {
    tag,
    version,
    untar,
    dir
  } = options || {};

  untar = typeof untar !== 'undefined' ? untar : true;
  dir = dir || process.cwd();

  return _fetchRegistryData(packageName)
    .then((res) => {
      return new Promise((resolve, reject) => {
        const body = res.body;
        if (Object.keys(body).length === 0) {
          reject(new Error(`Package '${packageName}' does not exist.`));
        }

        let resolvedVersion = _resolveRegistryVersion(body, tag, version);
        version = resolvedVersion.version;

        const tarball = resolvedVersion.dist.tarball;
        const fileName = `${packageName}-${version}.tgz`;
        const streamPath = path.resolve(dir, fileName);

        const read = request
          .get(tarball)
          .timeout({
            response: DEFAULT_RESPONSE_TIMEOUT,
            deadline: DEFAULT_DEADLINE_TIMEOUT
          });

        let write;
        if (untar) {
          write = targz().createWriteStream(dir);
        } else {
          write = fs.createWriteStream(streamPath);
        }

        let stream = read.pipe(write);

        stream.on('finish', resolve);
        stream.on('error', reject);
      });
    });
};
