const _ = require('lodash');
const url = require('url');
const glob = require('glob');
const path = require('path');
const next = require('next');
const express = require('express');
const { readFileSync } = require('fs');
const cookieParser = require('cookie-parser');
const routes = require('../lib/routes');

const port = parseInt(process.env.PORT, 10) || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

// ====================
// Locale Helpers
// ====================

const getMessages = () => (
  glob.sync('./messages/*.json')
    .map(filename => [
      path.basename(filename, '.json'),
      readFileSync(filename, 'utf8'),
    ])
    .map(([lcid, file]) => [lcid, JSON.parse(file)])
    .reduce((collection, [lcid, messages]) => {
      collection[lcid] = messages; // eslint-disable-line no-param-reassign

      return collection;
    }, {})
);

// `react-intl` 라이브러리에서 필요한 지역 데이터를 불러옵니다.
const getLocaleDataScript = () => (
  glob.sync('./messages/*.json')
    .map(filename => _.split(path.basename(filename), '.')[0])
    .reduce((collection, locale) => {
      const lang = _.split(locale, '-')[0];
      const localeDataFile = require.resolve(`react-intl/locale-data/${lang}`);
      const localeDataScript = readFileSync(localeDataFile, 'utf8');

      collection[lang] = localeDataScript; // eslint-disable-line no-param-reassign

      return collection;
    }, {})
);

// ====================
// Custom Parsers
// ====================

const httpToHttpsParser = () => (req, res, _next) => {
  const host = req.get('host');
  const protocol = req.get('X-Forwarded-Proto');
  const pathname = req.originalUrl;

  if (dev) { return _next(); }
  if (_.startsWith(host, 'local')) { return _next(); }
  if (protocol === 'https' && _.startsWith(host, 'www')) { return _next(); }

  const newHost = _.startsWith(host, 'www') ? host : `www.${host}`;
  const format = { protocol: 'https', host: newHost, pathname };
  const fullUrl = url.format(format);

  return res.redirect(301, fullUrl);
};

const trailingSlashParser = () => (req, res, _next) => {
  if (!_.includes(req.url, '/_next/') && req.url.substr(-1) === '/' && req.url.length > 1) {
    return res.redirect(302, req.url.slice(0, -1));
  }

  return _next();
};

// 요청에 지역 정보를 포함합니다.
const localeParser = () => (req, res, _next) => {
  /*
   * 개발 옵션으로 서버를 실행할 경우 HMR(Hot Module Replacement) 모듈에서
   * `/_next/...` 경로를 주기적으로 호출하는데 속도 최적화를 위해 이때에는
   * 번역 텍스트를 포함하지 않습니다.
   */
  if (_.startsWith(req.url, '/_next')) { return _next(); }

  req.messages = getMessages();
  req.localeDataScript = getLocaleDataScript();

  let currentLocale = req.cookies.locale;

  // 쿠키에 지역이 설정돼있지 않은 경우, 헤더의 `Accept-Language`를 참조합니다.
  // https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Accept-Language
  if (_.isNil(currentLocale)) {
    const acceptLanguage = _.split(_.split(req.headers['accept-language'], ','), ';')[0];
    const similarAcceptLanguage = acceptLanguage.substring(0, 2);

    // `Accept-Language` 헤더값과 일치하는 지역을 찾습니다.
    currentLocale = _.find(_.keys(req.messages), l => l === acceptLanguage);

    // 정확히 일치하는 지역이 없을 경우에 가장 유사한 값을 찾습니다.
    if (_.isNil(currentLocale)) {
      currentLocale = _.find(_.keys(req.messages), l => _.startsWith(l, similarAcceptLanguage));
    }
  }

  req.currentLocale = currentLocale || 'en-US';

  return _next();
};

// ====================
// NextJS
// ====================

app.prepare().then(() => {
  const server = express();

  server.use([
    httpToHttpsParser(),
    trailingSlashParser(),
    cookieParser(),
    localeParser(),
  ]);

  routes(app, server);

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // eslint-disable-line no-console
  });
});
