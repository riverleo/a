import _ from 'lodash';
import { fromJS } from 'immutable';
import {
  getComponents,
  createComponent,
  updateComponent,
  removeComponent,
} from '../../../lib/api';

const SET = 'CORE_COMPONENT_SET';
const CREATE = 'CORE_COMPONENT_CREATE';
const UPDATE = 'CORE_COMPONENT_UPDATE';
const REMOVE = 'CORE_COMPONENT_REMOVE';
const RELOAD = 'CORE_COMPONENT_RELOAD';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const create = payload => ({ type: CREATE, payload });
export const update = payload => ({ type: UPDATE, payload });
export const remove = payload => ({ type: REMOVE, payload });
export const reload = payload => ({ type: RELOAD, payload });

// ==========================================
// Epics
// ==========================================

export const createEpic = action$ => (
  action$
    .ofType(CREATE)
    .mergeMap(action =>
      createComponent(action.payload).then(({ data }) => set(data.data)))
);

export const updateEpic = action$ => (
  action$
    .ofType(UPDATE)
    .mergeMap(({ payload: { id, ...props } }) =>
      updateComponent(id, props).then(({ data }) => set(data.data)))
);

export const removeEpic = action$ => (
  action$.ofType(REMOVE).mergeMap(({ payload: data }) =>
    removeComponent(data))
);

export const reloadEpic = action$ => (
  action$
    .ofType(RELOAD)
    .mergeMap(() =>
      getComponents({
      }).then(({ data }) => set(data.data)))
);

// ==========================================
// Reducer
// ==========================================

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      let newState;

      if (_.isArray(action.payload)) {
        newState = _.keyBy(action.payload, s => s.key);
      } else if (_.isPlainObject(action.payload)) {
        newState = fromJS(state).set(action.payload.key, action.payload).toJS();
      }

      return _.assign({}, state, newState);
    }
    case CREATE:
    case UPDATE:
      return _.assign({}, state, { [action.payload.key]: action.payload });
    case REMOVE:
      return _.omitBy(state, s => s.id === action.payload);
    default:
      return state;
  }
};
