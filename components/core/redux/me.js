import _ from 'lodash';
import { getMe } from '../../../lib/api';

const SET = 'CORE_ME_SET';
const GET = 'CORE_ME_GET';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const get = payload => ({ type: GET, payload });

// ==========================================
// Epics
// ==========================================

export const getEpic = action$ => (
  action$.ofType(GET)
    .mergeMap(action => getMe(action.payload)
      .then(({ data }) => set({ data: data.data, error: undefined }))
      .catch(({ response }) => set({ data: undefined, error: _.get(response, 'data.error') })))
);

// ==========================================
// Reducer
// ==========================================

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return _.assign({}, state, action.payload);
    default:
      return state;
  }
};
