import _ from 'lodash';
import axios from 'axios';
import Cookies from 'js-cookie';
import FormData from 'form-data';

export const API_URL = 'https://api.wslo.co';

const getRequest = (customBaseURL) => {
  const ssid = Cookies.get('ssid');
  const baseURL = customBaseURL || API_URL;
  const headers = {};

  if (!_.isNil(ssid)) {
    headers.Authorization = `Bearer ${ssid}`;
  }

  return axios.create({ baseURL, headers });
};

export const getMe = (props, config) => getRequest()
  .post('/users/me', _.assign({}, props, { props: ['name', 'email', 'candidateName', 'candidateEmail'] }), config);

export const getLocales = props => getRequest().get('/locales', props);

export const createUser = props => getRequest().post('/users', props);
export const updateUser = (id, props) => getRequest().put(`/users/${id}`, props);

export const getMessages = props => getRequest().get('/messages', props);
export const upsertMessage = props => getRequest().post('/messages', props);
export const removeMessage = (id, props) => getRequest().delete(`/messages/${id}`, props);
export const reloadMessage = props => getRequest('/').post('/messages', props).catch(res => res);

export const getComponents = props => getRequest().get('/components', props);
export const createComponent = props => getRequest().post('/components', props);
export const updateComponent = (id, props) => getRequest().put(`/components/${id}`, props);
export const removeComponent = (id, props) => getRequest().delete(`/components/${id}`, props);

export const getWork = (id, props) => getRequest().get(`/works/${id}`, props);
export const getWorks = props => getRequest().get('/works', props);
export const upsertWork = props => getRequest().post('/works', props);
export const removeWork = (id, props) => getRequest().delete('/works', props);

export const createFiles = (files) => {
  const formData = new FormData();
  const headers = { 'content-type': 'multipart/form-data' };

  _.forEach(files, file => formData.append(file.name, file));

  return getRequest('https://file.wslo.co').post('/', formData, { headers });
};
