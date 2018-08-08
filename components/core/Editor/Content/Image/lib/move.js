import _ from 'lodash';
import { fromJS } from 'immutable';
import parse from './parse';
import serialize from './serialize';

export default ({ content, item, path }) => (
  fromJS(content)
    .updateIn(['items'], (items) => {
      const { row, col } = path || {};

      if (!_.isFinite(row) || !_.isFinite(col)) {
        console.warn(`이동하려는 위치(row: ${row}, col: ${col})가 올바르지 않습니다.`);
        return items;
      }

      const index = items.findIndex(i => i.get('id') === item.id);
      const parsed = parse(items.delete(index).toJS());

      if (_.isNil(parsed[row])) {
        parsed[row] = [];
      }

      parsed[row].splice(col, 0, item);

      return fromJS(serialize(parsed));
    })
    .toJS()
);
