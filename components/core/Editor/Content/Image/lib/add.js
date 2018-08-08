import _ from 'lodash';
import { fromJS } from 'immutable';
import parse from './parse';
import serialize from './serialize';

export default ({ content, items: newItems, path }) => (
  fromJS(content)
  .updateIn(['items'], (items) => {
    const parsed = parse(items.toJS());
    let { row, col } = path || {};

    if (_.isNil(row)) {
      row = _.max(items.map(i => i.get('row'))) || 0;
    }

    if (_.isNil(col)) {
      col = _.max(items.map(i => i.get('col'))) || 0;
    }

    if (_.isArray(newItems)) {
      _.forEach(newItems, (item) => {
        _.set(parsed, [row, col], item);
        col += 1;
      });
    } else {
      _.set(parsed, [row, col], newItems);
    }

    return fromJS(serialize(parsed));
  }).toJS()
);
