import _ from 'lodash';
import {
  any,
  func,
  shape,
  string,
  objectOf,
} from 'prop-types';
import React, { Component } from 'react';
import { save } from './redux';
import styled from '../../../../lib/styled';
import { connect } from '../../../../lib/store';
import List from './List';
import Editor from './Editor';

const mapStateToProps = state => ({
  message: state.core.admin.message,
});

class Message extends Component {
  static propTypes = {
    message: shape({
      selected: objectOf(any),
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func.isRequired,
  }

  handleClickSave = () => {
    this.props.dispatch(save());
  }

  render() {
    const { t } = this.context;
    const { className, message } = this.props;
    const { selected } = message;

    return (
      <div className={className}>
        <button onClick={this.handleClickSave}>
          {t('coreAdminSave')}
        </button>
        {_.isNil(selected) ? <List /> : <Editor />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Message, 'AdminMessage'));
