import _ from 'lodash';

const SET = 'CORE_ADMIN_COMPONENT_SET';
const ACTIVE = 'CORE_ADMIN_COMPONENT_ACTIVE';
const DEACTIVE = 'CORE_ADMIN_COMPONENT_DEACTIVE';
const SELECT = 'CORE_ADMIN_COMPONENT_SELECT';
const DESELECT = 'CORE_ADMIN_COMPONENT_DESELECT';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const active = payload => ({ type: ACTIVE, payload });
export const deactive = payload => ({ type: DEACTIVE, payload });
export const select = payload => ({ type: SELECT, payload });
export const deselect = payload => ({ type: DESELECT, payload });

// ==========================================
// Reducer
// ==========================================

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return _.assign({}, state, action.payload);
    case ACTIVE:
      return _.assign({}, state, { actived: action.payload });
    case DEACTIVE:
      return _.assign({}, state, { actived: undefined });
    case SELECT:
      return _.assign({}, state, { selected: action.payload });
    case DESELECT:
      return _.assign({}, state, { selected: undefined });
    default:
      return state;
  }
};
