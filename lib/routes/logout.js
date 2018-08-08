// 로그아웃은 보안상의 이유로 서버에서 처리합니다.
module.exports = () => (req, res) => {
  res.clearCookie('ssid');
  res.redirect('/');
};
