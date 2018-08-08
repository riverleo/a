import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { connect } from '../../../lib/store';
import styled from '../../../lib/styled';
import { select } from './redux';

const mapStateToProps = state => ({
  login: state.core.login,
});

class SelectForm extends Component {
  static propTypes = {
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  moveToNewAccount = () => this.props.dispatch(select('newAccount'))

  moveToByPassword = () => this.props.dispatch(select('byPassword'))

  render() {
    const { t } = this.context;
    const { className } = this.props;

    return (
      <div className={className}>
        <h1>{t('coreLoginTitle')}</h1>
        <h3>{t('coreLoginDescription')}</h3>

        <ul>
          <li>
            <a href="https://api.wslo.co/connects/facebook">
              {t('coreLoginSignInWithFacebook')}
            </a>
          </li>
          <li>
            <button onClick={this.moveToByPassword}>
              {t('coreLoginSignInWithEmail')}
            </button>
          </li>
        </ul>

        <div>
          {t('coreLoginNewAccountHelp')}
          <button onClick={this.moveToNewAccount}>
            {t('coreLoginNewAccount')}
          </button>
        </div>
        <div>{t('coreLoginTermsOfService')}</div>
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(SelectForm, 'LoginSelectForm'));
