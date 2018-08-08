import React, { Component } from 'react';
import { string, func } from 'prop-types';
import styled from '../../../lib/styled';


class Top extends Component {
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
        <header>
          {t('homeBannerTopHeader')}
        </header>
        <dl>
          <dt>{t('homeBannerTopListItemImage')}</dt>
          <dd>{t('homeBannerTopListItemTitle')}</dd>
        </dl>
        <footer>
          {t('homeBannerTopFooter')}
        </footer>
      </div>
    );
  }
}

export default styled(Top, 'HomeBannerTop');
