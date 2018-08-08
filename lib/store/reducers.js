import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';

import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import coreMe, { getEpic as getMeEpic } from '../../components/core/redux/me';
import coreAdmin from '../../components/core/Admin/redux';
import coreAdminMessage, {
  getEpic as getMessageEpic,
  saveEpic as saveMessageEpic,
  upsertEpic as upsertMessageEpic,
  removeEpic as removeMessageEpic,
} from '../../components/core/Admin/Message/redux';
import coreAdminComponent from '../../components/core/Admin/Component/redux';
import coreRoute from '../../components/core/redux/route';
import coreLogin, {
  resetEpic as resetLoginEpic,
  newAccountEpic as newAccountLoginEpic,
} from '../../components/core/Login/redux';
import coreLocale from '../../components/core/redux/locale';
import coreNavbar from '../../components/core/Navbar/redux';
import coreEditor from '../../components/core/Editor/redux';
import coreMessage from '../../components/core/redux/message';
import coreComponent, {
  createEpic as createComponentEpic,
  updateEpic as updateComponentEpic,
  removeEpic as removeComponentEpic,
  reloadEpic as reloadComponentEpic,
} from '../../components/core/redux/component';
import workList, { getEpic as getWorkListEpic } from '../../components/Work/List/redux';
import workDetail, { getEpic as getWorkDetailEpic } from '../../components/Work/Detail/redux';
import workNewOrEdit, {
  getEpic as getWorkNewOrEditEpic,
  upsertEpic as upsertWorkNewOrEditEpic,
  removeEpic as removeWorkNewOrEditEpic,
} from '../../components/Work/NewOrEdit/redux';

export const rootEpic = combineEpics(
  getMeEpic,
  resetLoginEpic,
  newAccountLoginEpic,
  getMessageEpic,
  saveMessageEpic,
  upsertMessageEpic,
  removeMessageEpic,
  createComponentEpic,
  updateComponentEpic,
  removeComponentEpic,
  reloadComponentEpic,
  getWorkListEpic,
  getWorkDetailEpic,
  getWorkNewOrEditEpic,
  upsertWorkNewOrEditEpic,
  removeWorkNewOrEditEpic,
);

export const rootReducer = {
  core: combineReducers({
    me: coreMe,
    admin: combineReducers({
      app: coreAdmin,
      message: coreAdminMessage,
      component: coreAdminComponent,
    }),
    route: coreRoute,
    login: coreLogin,
    locale: coreLocale,
    navbar: coreNavbar,
    editor: coreEditor,
    message: coreMessage,
    component: coreComponent,
  }),
  work: combineReducers({
    list: workList,
    detail: workDetail,
    newOrEdit: workNewOrEdit,
  }),
};
