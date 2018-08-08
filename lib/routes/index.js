const works = require('./works');
const logout = require('./logout');
const messages = require('./messages');

/**
 * Express 기반의 라우팅 맵에 사용자 정의 라우팅을 추가합니다.
 * 자세한 라우팅 방식은 아래의 Express 문서에서 확인 가능합니다.
 * http://expressjs.com/ko/guide/routing.html
 *
 * @params {object} app - NextJS App
 * @params {object} server - Express Server
 */
function routes(app, server) {
  const handle = app.getRequestHandler();

  server.get('/logout', logout(app, server));
  server.post('/messages', messages(app, server));
  server.get('/works/:id?/:action?', works(app, server));

  server.get('*', (req, res) => handle(req, res));
}

module.exports = routes;
