import serialize from './serialize';

describe('serialize.js', () => {
  it('유효한 구조화 리스트를 정렬하는 경우', () => {
    const serialized = serialize([
      [{ id: 0 }, { id: 1 }, { id: 2 }],
      [{ id: 3 }, { id: 4 }],
    ]);

    expect(serialized[0]).toHaveProperty('id', 0);
    expect(serialized[0]).toHaveProperty('path', { row: 0, col: 0 });
    expect(serialized[1]).toHaveProperty('id', 1);
    expect(serialized[1]).toHaveProperty('path', { row: 0, col: 1 });
    expect(serialized[2]).toHaveProperty('id', 2);
    expect(serialized[2]).toHaveProperty('path', { row: 0, col: 2 });
    expect(serialized[3]).toHaveProperty('id', 3);
    expect(serialized[3]).toHaveProperty('path', { row: 1, col: 0 });
    expect(serialized[4]).toHaveProperty('id', 4);
    expect(serialized[4]).toHaveProperty('path', { row: 1, col: 1 });
  });
});
