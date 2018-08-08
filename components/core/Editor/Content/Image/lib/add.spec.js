import add from './add';

describe('add.js', () => {
  it('신규로 여러 아이템을 삽입하는 경우', () => {
    const content = { items: [] };
    const items = [{ id: 1 }, { id: 2 }];

    const addedContent = add({ content, items });

    expect(addedContent.items).toHaveLength(2);
  });

  it('신규로 하나의 아이템을 삽입하는 경우', () => {
    const content = { items: [] };
    const items = { id: 1 };

    const addedContent = add({ content, items });

    expect(addedContent.items).toHaveLength(1);
  });
});
