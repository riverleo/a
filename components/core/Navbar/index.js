/* global window */

import _ from 'lodash';
import cn from 'classnames';
import Link from 'next/link';
import React, { Component } from 'react';
import { bool, string, func, shape } from 'prop-types';
import { connect } from '../../../lib/store';
import styled from '../../../lib/styled';
import { set } from './redux';
import { show as showLogin } from '../Login/redux';
import Dropdown from './Dropdown';

const mapStateToProps = state => ({
  me: state.core.me,
  navbar: state.core.navbar,
});

class Navbar extends Component {
  static propTypes = {
    me: shape({
      data: shape({
        name: string,
        avatar: string,
      }),
    }).isRequired,
    navbar: shape({
      showDropdown: bool,
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  componentDidMount() {
    window.addEventListener('click', this.handleHideDropdown);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleHideDropdown);
  }

  handleClickMe = (e) => {
    e.stopPropagation();

    const { dispatch, navbar } = this.props;
    const { showDropdown } = navbar;

    dispatch(set({ showDropdown: !showDropdown }));
  }

  handleShowLogin = () => {
    this.props.dispatch(showLogin());
  }

  handleHideDropdown = () => {
    this.props.dispatch(set({ showDropdown: false }));
  }

  render() {
    const { t } = this.context;
    const { me, navbar, className } = this.props;
    const { name } = me.data || {};
    const { showDropdown } = navbar;

    return (
      <div className={cn(className)}>
        <h1>
          <Link href="/">
            <a>{t('logo')}</a>
          </Link>
        </h1>
        <ul>
          {
            (() => {
              if (_.has(me.data, 'id')) {
                return [
                  <li key="new">
                    <Link
                      as="/works/new"
                      href={{
                        pathname: '/works',
                        query: { id: 'new' },
                      }}
                    >
                      <a>{t('coreNavbarNewWork')}</a>
                    </Link>
                  </li>,
                  <li key="me">
                    <button onClick={this.handleClickMe}>
                      user {name}
                    </button>
                    {showDropdown && <Dropdown />}
                  </li>,
                ];
              }

              return (
                <li>
                  <button onClick={this.handleShowLogin}>
                    {t('coreNavbarLogin')}
                  </button>
                </li>
              );
            })()
          }
        </ul>
      </div>
    );
  }
}


export default connect(mapStateToProps)(styled(Navbar, 'Navbar'));
