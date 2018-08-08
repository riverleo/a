const _ = require('lodash');
const fs = require('fs');
const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies
const mime = require('mime-types'); // eslint-disable-line import/no-extraneous-dependencies

AWS.config.update({
  accessKeyId: 'AKIAIN3HLHS26Z4CLVUA',
  secretAccessKey: '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',
});

const directory = './.out';

function getFiles(dir, _fileList) {
  const fileList = _fileList || [];

  const files = fs.readdirSync(dir);
  _.forEach(files, (__, key) => {
    if (!_.has(files, key)) { return; }

    const name = `${dir}/${files[key]}`;

    if (fs.statSync(name).isDirectory()) {
      getFiles(name, fileList);
    } else {
      fileList.push(name);
    }
  });

  return fileList;
}

function upload() {
  const files = getFiles(directory);
  const s3 = new AWS.S3({ signatureVersion: 'v4' });

  _.map(files, (key) => {
    fs.readFile(key, (err, data) => {
      const _key = key.replace(`${directory}/`, '');
      const contentType = mime.lookup(key);

      s3.putObject({
        Key: _key,
        Body: data,
        ACL: 'public-read',
        ContentType: contentType,
        Bucket: 'storybook.workslow.co',
      }, () => console.log(_key)); // eslint-disable-line no-console
    });
  });
}

upload(directory);
