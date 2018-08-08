import _ from 'lodash';
import { string, shape, objectOf, any } from 'prop-types';
import React, { Component } from 'react';
import styled from '../../../../lib/styled';
import { connect } from '../../../../lib/store';
import List from './List';
import Editor from './Editor';

const mapStateToProps = state => ({
  admin: state.core.admin.component,
});

class Component_ extends Component {
  static propTypes = {
    admin: shape({
      selected: objectOf(any),
    }).isRequired,
    className: string.isRequired,
  }

  handle = () => {}

  render() {
    const { className, admin } = this.props;
    const { selected } = admin;

    return (
      <div className={className}>
        {_.isNil(selected) ? <List /> : <Editor />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Component_, 'AdminComponent'));
