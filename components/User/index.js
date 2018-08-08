import React, { Component } from 'react';
import { string } from 'prop-types';
import styled from '../../lib/styled';

class User extends Component {
  static propTypes = {
    className: string.isRequired,
  }

  handle = () => {
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        User App
      </div>
    );
  }
}

export default styled(User, 'User');
