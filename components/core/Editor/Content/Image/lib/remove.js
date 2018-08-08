import _ from 'lodash';
import { fromJS } from 'immutable';
import parse from './parse';
import serialize from './serialize';

export default ({ content, item }) => (
  fromJS(content)
    .updateIn(['items'], (items) => {
      const id = _.get(item, 'id');
      const index = items.findIndex(i => i.get('id') === id);

      if (index === -1) {
        const ids = items.map(i => i.get('id')).toJS();
        console.warn(`존재하지 않는 이미지 아이템(${id})입니다.\n`, ids);

        return items;
      }

      const removed = parse(items.delete(index).toJS());

      return fromJS(serialize(removed));
    })
    .toJS()
);
