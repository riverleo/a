import _ from 'lodash';

const SET = 'CORE_EDITOR_SET';
const CHANGE = 'CORE_EDITOR_CHANGE';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const change = payload => ({ type: CHANGE, payload });

// ==========================================
// Reducer
// ==========================================

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return _.assign({}, state, action.payload);
    case CHANGE: {
      const active = state.active || 'changed';

      return _.assign({}, state, { [active]: { ...state[active], ...action.payload } });
    }
    default:
      return state;
  }
};
