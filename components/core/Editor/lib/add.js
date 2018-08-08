import _ from 'lodash';
import { fromJS } from 'immutable';
import newId from '../../../../lib/newId';

export default ({ contents, content, index }) => {
  const newIndex = _.isNil(index) ? _.size(content) : index;

  if (_.isNil(content.id)) {
    content.id = newId(); // eslint-disable-line no-param-reassign
  }

  if (_.findIndex(contents, c => c.id === content.id) >= 0) {
    console.warn(`이미 존재하는 컨텐츠(id: ${content.id})입니다.`);
    return contents;
  }

  return fromJS(contents || []).insert(newIndex, content).toJS();
};
