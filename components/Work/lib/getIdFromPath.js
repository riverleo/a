import _ from 'lodash';

export default (path) => {
  const matched = path.match(/\/works\/([a-zA-Z0-9]+)/);

  if (_.isNil(matched)) { return undefined; }

  const id = matched[1];

  if (id === 'new') { return undefined; }

  return id;
};
