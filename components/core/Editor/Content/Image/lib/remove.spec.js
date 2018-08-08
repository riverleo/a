import _ from 'lodash';
import remove from './remove';
import newId from '../../../../../../lib/newId';

describe('remove.js', () => {
  it('존재하는 아이템을 지우는 경우', () => {
    const content = { items: _.times(4, () => ({ id: newId() })) };
    const removed = _.map(remove({ content, item: content.items[0] }).items, r => r.id);

    expect(content.items).toHaveLength(4);
    expect(removed).toHaveLength(3);
    expect(removed).not.toContain(content.items[0].id);
    expect(removed).toContain(content.items[1].id);
    expect(removed).toContain(content.items[2].id);
    expect(removed).toContain(content.items[3].id);
  });

  it('존재하지 않는 아이템을 지우는 경우', () => {
    const content = { items: _.times(4, () => ({ id: newId() })) };
    const removed = _.map(remove({ content, item: { id: 'nonexistent id' } }).items, r => r.id);

    expect(content.items).toHaveLength(4);
    expect(removed).toHaveLength(4);
    expect(removed).toContain(content.items[0].id);
    expect(removed).toContain(content.items[1].id);
    expect(removed).toContain(content.items[2].id);
    expect(removed).toContain(content.items[3].id);
  });

  it('`null` 또는 `undefined` 값이 인자로 들어온 경우', () => {
    const content = { items: _.times(4, () => ({ id: newId() })) };

    let removed = _.map(remove({ content, item: null }).items, r => r.id);

    expect(content.items).toHaveLength(4);
    expect(removed).toHaveLength(4);
    expect(removed).toContain(content.items[0].id);
    expect(removed).toContain(content.items[1].id);
    expect(removed).toContain(content.items[2].id);
    expect(removed).toContain(content.items[3].id);

    removed = _.map(remove({ content, item: undefined }).items, r => r.id);

    expect(content.items).toHaveLength(4);
    expect(removed).toHaveLength(4);
    expect(removed).toContain(content.items[0].id);
    expect(removed).toContain(content.items[1].id);
    expect(removed).toContain(content.items[2].id);
    expect(removed).toContain(content.items[3].id);
  });
});
