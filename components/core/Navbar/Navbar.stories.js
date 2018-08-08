import React from 'react';
import { storiesOf } from '@storybook/react';
import * as me from '../redux/me';
import * as login from '../Login/redux';
import withProvider from '../../../lib/withProvider';
import App from '../App';
import Navbar from '../Navbar';

let store;
const name = 'Navbar';

storiesOf(name, module)
.addDecorator((storyFn) => {
  const Provided = withProvider(() => storyFn(), (_store) => { store = _store; });

  return <Provided />;
})
.add('로그인 전', () => {
  store.dispatch(login.hide()); // 로그인 창 숨김
  store.dispatch(me.set({ data: undefined })); // 로그인 데이터 제거

  return <App><Navbar /></App>;
})
.add('로그인 후', () => {
  store.dispatch(me.set({ // 강제 로그인
    data: {
      id: 1,
      avatar: 'https://cdn-images-1.medium.com/fit/c/64/64/0*zAUDiBv_8Y_r6CgM.jpg',
    },
  }));

  return <Navbar />;
});
