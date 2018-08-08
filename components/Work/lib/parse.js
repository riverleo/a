import _ from 'lodash';

export default ({ id, contents }) => ({
  title: _.first(contents).html,
  href: { pathname: 'works', query: { id } },
  asPath: `/works/${id}`,
});
