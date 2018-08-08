import _ from 'lodash';

export const format = ({ path, params }) => {
  const rawParams = _.join(_.map(params, (v, k) => `${k}=${v}`), '&');

  if (_.isEmpty(rawParams)) {
    return path;
  }

  return `${path}?${rawParams}`;
};

export const parse = (rawURL) => {
  const [path, search] = _.split(rawURL, '?');

  const params = {};

  _.forEach(_.split(search, '&'), (raw) => {
    const [key, value] = _.split(raw, '=');

    params[key] = value;
  });

  return {
    path,
    params,
  };
};
