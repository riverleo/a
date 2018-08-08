import _ from 'lodash';
import Cookies from 'js-cookie';
import { get } from '../redux/me';
import { createUser } from '../../../lib/api';

const SET = 'CORE_LOGIN_SET';
const SHOW = 'CORE_LOGIN_SHOW';
const HIDE = 'CORE_LOGIN_HIDE';
const RESET = 'CORE_LOGIN_RESET';
const SELECT = 'CORE_LOGIN_SELECT';
const NEW_ACCOUNT = 'CORE_ME_NEW_ACCOUNT';

// ==========================================
// Actions
// ==========================================

export const set = payload => ({ type: SET, payload });
export const show = payload => ({ type: SHOW, payload });
export const hide = payload => ({ type: HIDE, payload });
export const reset = payload => ({ type: RESET, payload });
export const select = payload => ({ type: SELECT, payload });
export const newAccount = payload => ({ type: NEW_ACCOUNT, payload });

// ==========================================
// Epics
// ==========================================

export const resetEpic = action$ => (
  action$.ofType(HIDE).mapTo(reset())
);

export const newAccountEpic = action$ => (
  action$.ofType(NEW_ACCOUNT)
    .mergeMap(action => createUser(action.payload)
      .then(({ data }) => {
        const ssid = _.get(data, 'data.ssid');

        if (!_.isNil(ssid)) {
          Cookies.set('ssid', ssid, { expires: 365 * 7 });
        }

        return get();
      })
      .catch(({ response }) => set({ error: _.get(response, 'data.error') })))
);

// ==========================================
// Reducer
// ==========================================

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return _.assign({}, state, action.payload);
    case SHOW:
      return _.assign({}, action.payload, { show: true });
    case HIDE:
      return _.assign({}, action.payload, { show: false });
    case RESET:
      return _.assign({}, state, { form: undefined });
    case SELECT:
      return _.assign({}, state, { form: action.payload });
    default:
      return state;
  }
};
