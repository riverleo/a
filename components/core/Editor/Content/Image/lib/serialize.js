import _ from 'lodash';

/**
 * 아이템 배열을 정렬한 뒤 `path` 프로퍼티를 설정합니다.
 */
export default parsed => (
  _.flattenDeep(_.map(parsed, (itemsOfRow, row) => (
    _.map(itemsOfRow, (item, col) => _.assign({}, item, { path: { row, col } }))
  )))
);
