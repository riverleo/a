import React, { Component } from 'react';
import { func, string } from 'prop-types';
import styled from '../../lib/styled';

class Home extends Component {
  static propTypes = {
    className: string.isRequired,
  }

  static contextTypes = {
    t: func.isRequired,
  }

  handle = () => {
  }

  render() {
    const { t } = this.context;
    const { className } = this.props;

    return (
      <div className={className}>
        {t('homeWelcome')}
      </div>
    );
  }
}

export default styled(Home, 'Home');
