import React, { Component } from 'react';
import { string, oneOf } from 'prop-types';
import styled from '../../../lib/styled';
import Top from './Top';

class Banner extends Component {
  static propTypes = {
    type: oneOf(['top']),
    className: string.isRequired,
  }

  static defaultProps = {
    type: 'top',
  }

  handle = () => {
  }

  render() {
    const { type, className } = this.props;

    return (
      <div className={className}>
        {
          (() => {
            switch (type) {
              case 'top':
              default:
                return <Top />;
            }
          })()
        }
      </div>
    );
  }
}

export default styled(Banner, 'HomeBanner');
