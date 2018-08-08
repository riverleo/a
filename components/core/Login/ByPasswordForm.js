import React, { Component } from 'react';
import { string, func } from 'prop-types';
import styled from '../../../lib/styled';
import { connect } from '../../../lib/store';
import { reset } from './redux';
import { get } from '../redux/me';

const mapStateToProps = state => ({
  login: state.core.login,
});

class ByPasswordForm extends Component {
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
  }

  handleSubmit = () => {
    const email = this.emailInput.current.value;
    const password = this.passwordInput.current.value;

    this.props.dispatch(get({ email, password }));
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

export default connect(mapStateToProps)(styled(ByPasswordForm, 'LoginByPasswordForm'));
