import _ from 'lodash';
import React, { Component } from 'react';
import { number, string, shape, func, arrayOf } from 'prop-types';
import styled from '../../../../lib/styled';
import { connect } from '../../../../lib/store';
import { select, remove } from './redux';

const mapStateToProps = state => ({
  locale: state.core.locale,
  message: state.core.admin.message,
});

class ListItem extends Component {
  static propTypes = {
    data: shape({
      id: number.isRequired,
      key: string.isRequired,
      translations: arrayOf(shape({
        body: string,
        lcid: string,
      })),
    }).isRequired,
    locale: shape({
      current: string.isRequired,
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  handleClick = () => {
    const { data, dispatch } = this.props;

    dispatch(select(data));
  }

  handleClickRemove = id => () => {
    this.props.dispatch(remove(id));
  }

  render() {
    const { className, locale, data } = this.props;
    const { key, translations } = data;
    const { body } = _.find(translations, tl => tl.lcid === locale.current) || {};

    return (
      <li className={className}>
        <button onClick={this.handleClick}>
          <dl>
            <dt>{key}</dt>
            <dd>{body}</dd>
          </dl>
        </button>
      </li>
    );
  }
}

export default connect(mapStateToProps)(styled(ListItem, 'AdminMessageListItem'));
