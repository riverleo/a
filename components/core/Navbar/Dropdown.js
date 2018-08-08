import React, { Component } from 'react';
import { string, func } from 'prop-types';
import styled from '../../../lib/styled';

class Dropdown extends Component {
  static propTypes = {
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  handleClick = e => e.stopPropagation()

  render() {
    const { t } = this.context;
    const { className } = this.props;

    return (
      <ul
        role="presentation"
        onClick={this.handleClick}
        className={className}
      >
        <li>{t('coreNavbarMyStories')}</li>
        <li>
          <a href="/logout">
            {t('coreNavbarLogout')}
          </a>
        </li>
      </ul>
    );
  }
}

export default styled(Dropdown, 'NavbarDropdown');
