import _ from 'lodash';
import Router from 'next/router';
import {
  getWork,
  upsertWork,
  removeWork,
} from '../../../lib/api';

const SET = 'WORK_NEW_OR_EDIT_SET';
const GET = 'WORK_NEW_OR_EDIT_GET';
const UPSERT = 'WORK_NEW_OR_EDIT_UPSERT';
const REMOVE = 'WORK_NEW_OR_EDIT_REMOVE';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const get = payload => ({ type: GET, payload });
export const upsert = payload => ({ type: UPSERT, payload });
export const remove = payload => ({ type: REMOVE, payload });

// ==========================================
// Epics
// ==========================================

export const getEpic = action$ => (
  action$.ofType(GET)
    .mergeMap(({ payload: { id } }) =>
      getWork(id)
        .then(({ data: { data } }) => set({ data, fetching: false }))
        .catch(e => set({ error: e.message })))
);

export const upsertEpic = (action$, store) => (
  action$
    .ofType(UPSERT)
    .mergeMap(() => {
      const { core, work } = store.getState();
      const { path } = core.route;
      const changed = _.get(work, ['newOrEdit', 'changed']);
      const asPath = `/works/${changed.id}/edit`;

      if (!_.isEqual(path, asPath)) {
        Router.replace({
          pathname: '/works',
          query: {
            id: changed.id,
            action: 'edit',
          },
        }, asPath, { shallow: true });
      }

      return upsertWork(changed)
        .then(({ data }) => set(data))
        .catch(e => set({ error: e.message }));
    })
);

export const removeEpic = action$ => (
  action$.ofType(REMOVE).mergeMap(({ payload: data }) =>
    removeWork(data).then(() => set({ data: undefined, changed: undefined })))
);

// ==========================================
// Reducer
// ==========================================

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET:
      return _.assign({}, state, { fetching: true });
    case SET:
      return _.assign({}, state, action.payload);
    default:
      return state;
  }
};
