const _ = require('lodash');
const fs = require('fs');
const axios = require('axios');

// `messages` 폴더의 번역 내용을 서버에서 받아와 갱신합니다.
module.exports = () => async (req, res) => {
  const locales = _.get(await axios.get('https://api.wslo.co/locales'), 'data.data');
  const messages = _.get(await axios.get('https://api.wslo.co/messages', { params: { all: true } }), 'data.data');

  const changes = {};
  _.forEach(locales, ({ lcid }) => { changes[lcid] = {}; });

  _.forEach(messages, ({ key, translations }) => {
    _.forEach(translations, ({ lcid, body }) => {
      if (_.isNil(changes[lcid])) { return; }

      changes[lcid][key] = body;
    });
  });

  _.forEach(changes, (changed, key) => fs.writeFileSync(`messages/${key}.json`, JSON.stringify(changed), 'utf8'));

  res.send({ data: changes });
};
