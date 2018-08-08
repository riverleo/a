import React from 'react';
import { mount } from 'enzyme';
import withProvider from '../../../lib/withProvider';
import Login from '../Login';

describe('<Login />', () => {
  let store;
  let rendered;

  beforeEach(() => {
    const Provided = withProvider(() => <Login />, (_store) => { store = _store; });
    rendered = mount(<Provided />).find('Login');
  });

  it('`Redux`와 올바르게 연결되었는가?', () => {
    expect(store).toHaveProperty('dispatch');
    expect(store).toHaveProperty('getState');

    expect(rendered.prop('login')).toEqual({});
  });
});
