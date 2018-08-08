/* global window */

import _ from 'lodash';
import cn from 'classnames';
import React, { Component } from 'react';
import { bool, string, shape, func } from 'prop-types';
import { connect } from '../../../lib/store';
import styled from '../../../lib/styled';
import { set, show, hide } from './redux';
import Message from './Message';
import Component_ from './Component';

const tools = [
  {
    key: 'component',
    Tab: Component_,
  },
  {
    key: 'message',
    Tab: Message,
  },
];

const mapStateToProps = state => ({
  core: state.core,
  app: state.core.admin.app,
});

class Admin extends Component {
  static propTypes = {
    app: shape({
      show: bool,
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func.isRequired,
  }

  componentDidMount() {
    window.addEventListener('click', this.handleClickHide);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleClickHide);
  }

  handleClickShow = () => {
    this.props.dispatch(show());
  }

  handleClickHide = () => {
    this.props.dispatch(hide());
  }

  handleClickTab = tab => () => {
    this.props.dispatch(set({ tab }));
  }

  render() {
    const { t } = this.context;
    const { className, app } = this.props;
    const { tab, show: _show } = app;
    const SelectedTab = _.find(tools, tool => tool.key === tab).Tab;

    return (
      <div
        role="presentation"
        onClick={e => e.stopPropagation()}
        className={cn(className, `${_show ? 'show' : 'hide'}`)}
      >
        {
          (() => {
            if (_show) {
              return (
                <main>
                  <header>
                    <ul>
                      {
                        _.map(tools, ({ key }) => (
                          <li
                            key={key}
                            className={cn({ active: tab === key })}
                          >
                            <button onClick={this.handleClickTab(key)}>
                              {t(`coreAdminTab${_.upperFirst(key)}`)}
                            </button>
                          </li>
                        ))
                      }
                    </ul>
                    <button onClick={this.handleClickHide}>
                      {t('coreAdminHide')}
                    </button>
                  </header>
                  <SelectedTab />
                </main>
              );
            }

            return (
              <button onClick={this.handleClickShow}>
                {t('coreAdminShow')}
              </button>
            );
          })()
        }
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Admin, 'Admin'));
