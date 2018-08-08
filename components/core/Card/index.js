import _ from 'lodash';
import Link from 'next/link';
import React, { Component } from 'react';
import { string, object } from 'prop-types';
import styled from '../../../lib/styled';
import Small from './Small';
import Large from './Large';

class Card extends Component {
  static propTypes = {
    type: string,
    data: object, // eslint-disable-line react/forbid-prop-types
    className: string.isRequired,
  }

  static defaultProps = {
    type: 'small',
    data: undefined,
  }

  handle = () => {
  }

  render() {
    const {
      data,
      type,
      className,
    } = this.props;
    const { href, asPath } = data || {};

    let card;
    switch (type) {
      case 'large':
        card = <Large data={data} />;
        break;
      case 'small':
      default:
        card = <Small data={data} />;
    }

    if (_.isNil(href)) {
      return <div className={className}>{card}</div>;
    }

    return (
      <Link href={href} as={asPath}>
        <a className={className}>
          {card}
        </a>
      </Link>
    );
  }
}

export default styled(Card, 'Card');
