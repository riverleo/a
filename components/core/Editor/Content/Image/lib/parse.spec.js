import parse from './parse';

describe('parse.js', () => {
  it('유효한 아이템 리스트를 파싱하는 경우', () => {
    const parsed = parse([
      { id: 0, path: { row: 0, col: 0 } },
      { id: 1, path: { row: 0, col: 1 } },
      { id: 2, path: { row: 0, col: 2 } },
      { id: 3, path: { row: 1, col: 0 } },
      { id: 4, path: { row: 1, col: 1 } },
    ]);

    expect(parsed[0][0]).toHaveProperty('id', 0);
    expect(parsed[0][1]).toHaveProperty('id', 1);
    expect(parsed[0][2]).toHaveProperty('id', 2);
    expect(parsed[1][0]).toHaveProperty('id', 3);
    expect(parsed[1][1]).toHaveProperty('id', 4);
  });

  it('`path` 값이 없는 아이템 리스트를 파싱하는 경우', () => {
    const parsed = parse([{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);

    expect(parsed[0][0]).toHaveProperty('id', 0);
    expect(parsed[0][1]).toHaveProperty('id', 1);
    expect(parsed[0][2]).toHaveProperty('id', 2);
    expect(parsed[0][3]).toHaveProperty('id', 3);
    expect(parsed[0][4]).toHaveProperty('id', 4);
  });

  it('순서가 섞인 아이템 리스트를 파싱하는 경우', () => {
    const parsed = parse([
      { id: 0, path: { row: 3, col: 1 } },
      { id: 1, path: { row: 3, col: 1 } },
      { id: 2, path: { row: 3, col: 9 } },
      { id: 3, path: { row: 1, col: 1 } },
      { id: 4, path: { row: 1, col: 0 } },
      { id: 5, path: { row: 1, col: 3 } },
      { id: 6, path: { row: 5, col: 0 } },
      { id: 7, path: { row: 5, col: 2 } },
      { id: 8, path: { row: 5, col: 6 } },
      { id: 9, path: { row: 5, col: 7 } },
    ]);

    expect(parsed[1][0]).toHaveProperty('id', 0);
    expect(parsed[1][0]).toHaveProperty('path', { row: 1, col: 0 });
    expect(parsed[1][1]).toHaveProperty('id', 1);
    expect(parsed[1][1]).toHaveProperty('path', { row: 1, col: 1 });
    expect(parsed[1][2]).toHaveProperty('id', 2);
    expect(parsed[1][2]).toHaveProperty('path', { row: 1, col: 2 });
    expect(parsed[0][1]).toHaveProperty('id', 3);
    expect(parsed[0][1]).toHaveProperty('path', { row: 0, col: 1 });
    expect(parsed[0][0]).toHaveProperty('id', 4);
    expect(parsed[0][0]).toHaveProperty('path', { row: 0, col: 0 });
    expect(parsed[0][2]).toHaveProperty('id', 5);
    expect(parsed[0][2]).toHaveProperty('path', { row: 0, col: 2 });
    expect(parsed[2][0]).toHaveProperty('id', 6);
    expect(parsed[2][0]).toHaveProperty('path', { row: 2, col: 0 });
    expect(parsed[2][1]).toHaveProperty('id', 7);
    expect(parsed[2][1]).toHaveProperty('path', { row: 2, col: 1 });
    expect(parsed[2][2]).toHaveProperty('id', 8);
    expect(parsed[2][2]).toHaveProperty('path', { row: 2, col: 2 });
    expect(parsed[2][3]).toHaveProperty('id', 9);
    expect(parsed[2][3]).toHaveProperty('path', { row: 2, col: 3 });
  });
});
