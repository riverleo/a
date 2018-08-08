import _ from 'lodash';

/**
 * 정렬된 아이템 리스트를 `path` 값을 기준으로 2차원 배열 구조로 변경합니다.
 */
export default (items) => {
  const maxRow = _.max(_.map(items, i => _.get(i, ['path', 'row'])));

  const parsed = _.filter(_.times(maxRow + 1, (row) => {
    const itemsOfRow = _.filter(items, i => _.get(i, ['path', 'row']) === row);

    return _.sortBy(itemsOfRow, i => _.get(i, ['path', 'col']));
  }), p => !_.isEmpty(p));

  // `col`, `row` 값이 올바르지 않은 아이템들은 맨 뒤에 포함시킨다.
  const filterFunc = i => _.findIndex(_.flattenDeep(parsed), ({ id }) => id === i.id) === -1;
  const orphaned = _.filter(items, filterFunc);

  if (!_.isEmpty(orphaned)) {
    parsed[_.size(parsed)] = orphaned;
  }

  // 모든 아이템들의 `path` 값을 재설정한다.
  return _.map(parsed, (itemsOfRow, row) => (
    _.map(itemsOfRow, (item, col) => _.assign({}, item, { path: { row, col } }))
  ));
};
