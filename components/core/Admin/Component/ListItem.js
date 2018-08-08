import { connect } from 'react-redux';
import React, { Component } from 'react';
import { number, string, func, shape } from 'prop-types';
import { select } from './redux';
import styled from '../../../../lib/styled';

const mapStateToProps = state => ({
  component: state.core.component,
});

class ListItem extends Component {
  static propTypes = {
    data: shape({
      id: number,
      key: string,
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  handleClick = () => {
    const { data, dispatch } = this.props;

    dispatch(select(data));
  }

  render() {
    const { className, data } = this.props;
    const { key } = data;

    return (
      <li className={className}>
        <button onClick={this.handleClick}>
          {key}
        </button>
      </li>
    );
  }
}

export default connect(mapStateToProps)(styled(ListItem, 'AdminComponentListItem'));
