/* global window */

import _ from 'lodash';
import cn from 'classnames';
import Cookies from 'js-cookie';
import React, { Component } from 'react';
import { bool, string, shape, func, node } from 'prop-types';
import styled from '../../lib/styled';
import { format } from '../../lib/url';
import { connect } from '../../lib/store';
import { get } from './redux/me';
import Admin from './Admin';
import Login from './Login';
import Navbar from './Navbar';

const mapStateToProps = state => ({
  login: state.core.login,
  admin: state.core.admin,
  route: state.core.route,
  navbar: state.core.navbar,
});

class App extends Component {
  static propTypes = {
    admin: shape({
      app: shape({
        show: bool,
      }).isRequired,
    }).isRequired,
    login: shape({
      show: bool,
    }).isRequired,
    route: shape({
      params: shape({
        ssid: string,
      }).isRequired,
    }).isRequired,
    navbar: shape({
      show: bool,
    }).isRequired,
    children: node,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static defaultProps = {
    children: undefined,
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    const { path, params } = route;
    const { ssid } = params;

    if (!_.isNil(ssid)) {
      const href = format({ path, params: _.omit(params, ['ssid', 'created']) });

      Cookies.set('ssid', ssid, { expires: 365 * 7 });
      dispatch(get());

      window.location.href = href;
    }
  }

  render() {
    const {
      admin,
      login,
      navbar,
      children,
      className,
    } = this.props;

    return (
      <div
        id="app"
        className={
          cn(className, {
            showLogin: login.show,
            showAdmin: admin.app.show,
            showNavbar: navbar.show,
          })
        }
      >
        {navbar.show && <Navbar />}
        {
          !_.isNil(children) && (
            <div className="AppContent">
              {children}
            </div>
          )
        }
        {login.show && <Login />}
        <Admin />
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(App, 'App'));
