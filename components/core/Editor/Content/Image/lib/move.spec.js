import _ from 'lodash';
import move from './move';

describe('move.js', () => {
  it('리스트에 존재하는 아이템을 옮기는 경우', () => {
    const content = {
      items: [
        { id: 0, path: { row: 0, col: 0 } },
        { id: 1, path: { row: 0, col: 1 } },
        { id: 2, path: { row: 0, col: 2 } },
        { id: 3, path: { row: 1, col: 0 } },
        { id: 4, path: { row: 1, col: 1 } },
      ],
    };
    const item = content.items[0];

    const path = { row: 2, col: 0 };
    const movedContent = move({ content, item, path });
    const movedItem = _.find(movedContent.items, i => i.id === item.id);

    expect(movedItem).toHaveProperty('path', path);
    expect(movedContent.items).toHaveLength(5);
  });
});
