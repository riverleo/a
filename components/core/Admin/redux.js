import _ from 'lodash';

const SET = 'CORE_ADMIN_SET';
const SHOW = 'CORE_ADMIN_SHOW';
const HIDE = 'CORE_ADMIN_HIDE';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const show = payload => ({ type: SHOW, payload });
export const hide = payload => ({ type: HIDE, payload });

// ==========================================
// Reducer
// ==========================================

const initialState = {
  tab: 'component',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return _.assign({}, state, action.payload);
    case SHOW:
      return _.assign({}, state, { show: true });
    case HIDE:
      return _.assign({}, state, { show: false });
    default:
      return state;
  }
};
