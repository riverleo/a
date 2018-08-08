import _ from 'lodash';
import { getWorks } from '../../../lib/api';

const GET = 'WORK_LIST_GET';
const SET = 'WORK_LIST_SET';

// ==========================================
// Actions
// ==========================================

export const get = payload => ({ type: GET, payload });
export const set = payload => ({ type: SET, payload });

// ==========================================
// Epics
// ==========================================

export const getEpic = action$ => (
  action$.ofType(GET)
    .mergeMap(payload =>
      getWorks(payload).then(({ data: { data } }) => set({ data, fetching: false })))
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
