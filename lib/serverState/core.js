import _ from 'lodash';
import { getMe, getLocales, getComponents } from '../api';
import { parse } from '../url';

export default async ({
  url,
  cookies,
  messages,
  currentLocale,
}) => {
  let me = {};
  let component = {};

  // 로그인 토큰이 없는 경우 불필요한 호출을 막는다.
  if (!_.isNil(cookies.ssid)) {
    try {
      const headers = { Authorization: `Bearer ${cookies.ssid}` };
      me = { data: _.get(await getMe(null, { headers }), 'data.data') };
    } catch (e) {
      // not logged in
      me = { error: _.get(e, 'response.data.error') };
    }
  }

  try {
    const data = _.get(await getComponents(), 'data.data');

    component = _.keyBy(data, s => s.key);
  } catch (e) {
    console.warn(e);
  }

  const data = _.get(await getLocales(), 'data.data');

  return {
    me,
    route: parse(url),
    locale: { current: currentLocale, data },
    message: messages,
    component,
  };
};
