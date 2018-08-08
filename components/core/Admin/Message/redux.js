import _ from 'lodash';
import { fromJS, List } from 'immutable';
import {
  getMessages,
  upsertMessage,
  removeMessage,
  reloadMessage,
} from '../../../../lib/api';

const SET = 'CORE_ADMIN_MESSAGE_SET';
const GET = 'CORE_ADMIN_MESSAGE_GET';
const SAVE = 'CORE_ADMIN_MESSAGE_SAVE';
const CHANGE = 'CORE_ADMIN_MESSAGE_CHANGE';
const UPSERT = 'CORE_ADMIN_MESSAGE_UPSERT';
const REMOVE = 'CORE_ADMIN_MESSAGE_REMOVE';
const SELECT = 'CORE_ADMIN_MESSAGE_SELECT';
const DESELECT = 'CORE_ADMIN_MESSAGE_DESELECT';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const get = payload => ({ type: GET, payload });
export const save = payload => ({ type: SAVE, payload });
export const change = payload => ({ type: CHANGE, payload });
export const upsert = payload => ({ type: UPSERT, payload });
export const remove = payload => ({ type: REMOVE, payload });
export const select = payload => ({ type: SELECT, payload });
export const deselect = payload => ({ type: DESELECT, payload });

// ==========================================
// Epics
// ==========================================

export const getEpic = (action$, store) => (
  action$
    .ofType(GET)
    .mergeMap(({ payload }) => {
      let by = payload || {};

      if (payload === true) {
        by = _.get(store.getState(), ['core', 'admin', 'message', 'by'], {});
      }

      return getMessages(by).then(({ data }) => set(data));
    })
);

export const saveEpic = (action$, store) => (
  action$
    .ofType(SAVE)
    .mergeMap(() => {
      let changes = _.get(store.getState(), ['core', 'admin', 'message', 'changes'], []);

      changes = _.map(changes, m => _.map(m.translations, t => _.assign({}, m, t)));
      changes = _.map(_.flatten(changes), c => _.pick(c, ['key', 'lcid', 'body']));

      return upsertMessage(changes).then(() => reloadMessage()).then(() => get(true));
    })
);

export const upsertEpic = action$ => (
  action$
    .ofType(UPSERT)
    .mergeMap(({ payload }) => upsertMessage(payload).then(() => get()))
);

export const removeEpic = action$ => (
  action$.ofType(REMOVE).mergeMap(({ payload: data }) =>
    removeMessage(data).then(() => get(true)))
);

// ==========================================
// Reducer
// ==========================================

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return _.assign({}, state, action.payload);
    case GET:
      return _.assign({}, state, { by: action.payload });
    case CHANGE: {
      const { key, lcid, body } = action.payload;

      return fromJS(state)
        .updateIn(['selected', 'translations'], (ts) => {
          const n = { body, lcid };
          const index = ts.findIndex(t => t.get('lcid') === lcid);

          return index >= 0 ? ts.set(index, n) : ts.push(n);
        })
        .update((s) => {
          const n = s.get('selected');
          const index = s.get('changes', List()).findIndex(m => m.get('key') === key);

          return s.updateIn(['changes'], List(), cs => (index >= 0 ? cs.set(index, n) : cs.push(n)));
        })
        .toJS();
    }
    case SELECT:
      return _.assign({}, state, { selected: action.payload });
    case DESELECT:
      return _.assign({}, state, { selected: undefined });
    default:
      return state;
  }
};
