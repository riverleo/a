import _ from 'lodash';

const CHANGE = 'CORE_LOCALE_CHANGE';

// ==========================================
// Actions
// ==========================================

export const change = payload => ({ type: CHANGE, payload });

// ==========================================
// Reducer
// ==========================================

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE:
      return _.assign({}, state, { current: action.payload });
    default:
      return state;
  }
};
