import _ from 'lodash';
import {
  func,
  shape,
  string,
  object,
  arrayOf,
} from 'prop-types';
import React, { Component } from 'react';
import styled from '../../../lib/styled';
import { connect } from '../../../lib/store';
import { Card } from '../../core';
import { parse } from '../lib';
import { get } from './redux';

const mapStateToProps = state => ({
  list: state.work.list,
});

class List extends Component {
  static propTypes = {
    list: shape({
      data: arrayOf(object),
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(get());
  }

  render() {
    const { className, list } = this.props;
    const { data } = list;

    return (
      <ul className={className}>
        {
          _.map(data, work => (
            <li key={work.id}>
              <Card data={parse(work)} />
            </li>
          ))
        }
      </ul>
    );
  }
}

export default connect(mapStateToProps)(styled(List, 'WorkList'));
