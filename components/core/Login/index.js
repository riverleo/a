import cn from 'classnames';
import React, { Component } from 'react';
import { bool, string, func, shape } from 'prop-types';
import { hide } from './redux';
import styled from '../../../lib/styled';
import { connect } from '../../../lib/store';
import SelectForm from './SelectForm';
import ByPasswordForm from './ByPasswordForm';
import NewAccountForm from './NewAccountForm';

const mapStateToProps = state => ({
  login: state.core.login,
});

class Login extends Component {
  static propTypes = {
    login: shape({
      show: bool,
      modal: bool,
      provider: string,
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  handleClickBackground = () => {
    this.props.dispatch(hide());
  }

  render() {
    const { login, className } = this.props;
    const { show, modal, form } = login;

    return (
      <div
        role="presentation"
        onClick={this.handleClickBackground}
        className={cn('login', className, { show, modal })}
      >
        <div
          role="presentation"
          onClick={e => e.stopPropagation()}
          className="box"
        >
          {
            (() => {
              switch (form) {
                case 'newAccount':
                  return <NewAccountForm />;
                case 'byPassword':
                  return <ByPasswordForm />;
                default:
                  return <SelectForm />;
              }
            })()
          }
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Login, 'Login'));
