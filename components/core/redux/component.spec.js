import _ from 'lodash';
import initStore from '../../../lib/store';
import { set } from './component';

describe('component.js', () => {
  let store;

  beforeEach(() => { store = initStore(); });

  it('배열로 초기화할 때', () => {
    const data = [
      { key: 'comp1' },
      { key: 'comp1' },
      { key: 'comp2' },
    ];

    store.dispatch(set(data));

    expect(store.getState()).toHaveProperty('core.component', _.keyBy(data, s => s.key));
  });

  it('오브젝트로 초기화할 때', () => {
    store.dispatch(set({ key: 'comp', style: 'body' }));
    expect(store.getState()).toHaveProperty('core.component.comp', { key: 'comp', style: 'body' });

    store.dispatch(set({ key: 'comp', style: 'new body' }));
    expect(store.getState()).toHaveProperty('core.component.comp', { key: 'comp', style: 'new body' });
  });
});
