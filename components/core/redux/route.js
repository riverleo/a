import _ from 'lodash';

export const CHANGE_COMPLETE = 'CORE_ROUTE_CHANGE_COMPLETE';

// ==========================================
// Reducer
// ==========================================

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COMPLETE:
      return _.assign({}, state, action.payload);
    default:
      return state;
  }
};
