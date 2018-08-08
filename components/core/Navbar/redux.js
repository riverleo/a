import _ from 'lodash';

const SET = 'CORE_NAVBAR_SET';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });

// ==========================================
// Reducer
// ==========================================

const initialState = {
  show: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return _.assign({}, state, action.payload);
    default:
      return state;
  }
};
