import _ from 'lodash';
import { fromJS } from 'immutable';

const SET = 'CORE_MESSAGE_SET';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });

// ==========================================
// Reducer
// ==========================================

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET: {
      const { key, lcid, body } = action.payload;

      if (_.isNil(key) || _.isNil(lcid)) {
        console.warn(`[${action.type}] 'key' 또는 'lcid'가 존재하지 않습니다.\naction.payload =>`, action.payload);
        return state;
      }

      return fromJS(state).setIn([lcid, key], body).toJS();
    }
    default:
      return state;
  }
};
