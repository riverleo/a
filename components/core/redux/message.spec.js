import initStore from '../../../lib/store';
import { set } from './message';

describe('messages.js', () => {
  let store;

  beforeEach(() => { store = initStore(); });

  describe('#set', () => {
    it('오브젝트로 초기화할 때', () => {
      store.dispatch(set({ key: 'key', lcid: 'ko-KR', body: 'body' }));
      expect(store.getState()).toHaveProperty('core.message.ko-KR.key', 'body');

      store.dispatch(set({ key: 'key', lcid: 'ko-KR', body: 'new body' }));
      expect(store.getState()).toHaveProperty('core.message.ko-KR.key', 'new body');
    });
  });
});
