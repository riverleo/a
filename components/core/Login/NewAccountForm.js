import _ from 'lodash';
import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from '../../../lib/store';
import styled from '../../../lib/styled';
import { reset, newAccount } from './redux';

const mapStateToProps = state => ({
  login: state.core.login,
});

class NewAccountForm extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  constructor(props) {
    super(props);

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
    this.confirmPasswordInput = React.createRef();
  }

  handleSubmit = () => {
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;
    const confirmPassword = this.confirmPasswordInput.current.value;
    const props = { email, password };

    if (_.isEmpty(email)) {
      return;
    }

    if (_.isEmpty(password)) {
      return;
    }

    if (password !== confirmPassword) {
      return;
    }

    this.props.dispatch(newAccount({ props }));
  }

  moveToSelect = () => this.props.dispatch(reset())

  render() {
    const { t } = this.context;
    const { className } = this.props;

    return (
      <div className={className}>
        <h1>{t('coreLoginTitle')}</h1>
        <div>
          <input
            type="email"
            ref={this.emailInput}
            placeholder={t('coreLoginEmail')}
          />
          <input
            type="password"
            ref={this.passwordInput}
            placeholder={t('coreLoginPassword')}
          />
          <input
            type="password"
            ref={this.confirmPasswordInput}
            placeholder={t('coreLoginPasswordConfirm')}
          />
          <button onClick={this.handleSubmit}>
            {t('coreLoginSubmit')}
          </button>
        </div>
        <div>
          <button onClick={this.moveToSelect}>
            {t('coreLoginBackToSelect')}
          </button>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(NewAccountForm, 'LoginNewAccountForm'));
