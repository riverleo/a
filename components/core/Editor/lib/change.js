import _ from 'lodash';
import { fromJS } from 'immutable';

export default ({ contents, content }) => {
  const { id } = content || {};
  const index = _.findIndex(contents, c => c.id === id);

  if (index === -1) {
    console.warn(`컨텐츠가 존재하지 않습니다. (id: ${id})`);
    return contents;
  }

  return fromJS(contents).set(index, content).toJS();
};
