import _ from 'lodash';
import cn from 'classnames';
import React, { Component } from 'react';
import {
  func,
  shape,
  string,
  object,
  objectOf,
} from 'prop-types';
import styled from '../../../../lib/styled';
import { connect } from '../../../../lib/store';
import { create } from '../../redux/component';
import { set } from './redux';
import ListItem from './ListItem';

const mapStateToProps = state => ({
  admin: state.core.admin.component,
  component: state.core.component,
});

class List extends Component {
  static propTypes = {
    admin: shape({
      mode: string,
    }).isRequired,
    component: objectOf(object).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func.isRequired,
  }

  state = {
    value: '',
  }

  handleSubmit = () => {
    const { value } = this.state;
    const { dispatch } = this.props;

    dispatch(create({ key: value }));
    this.setState({ value: '' });
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  toggleEditMode = () => {
    const { dispatch, admin } = this.props;
    const mode = admin.mode === 'edit' ? undefined : 'edit';

    dispatch(set({ mode }));
  }

  render() {
    const { t } = this.context;
    const { value } = this.state;
    const { className, admin, component } = this.props;
    const { mode } = admin;

    return (
      <div className={cn(className, mode)}>
        <header>
          <input
            value={value}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>
            {t('coreAdminCreate')}
          </button>
          <button onClick={this.toggleEditMode}>
            {t('coreAdminMode', { mode })}
          </button>
        </header>

        <ul>{_.map(component, c => <ListItem key={c.id} data={c} />)}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(List, 'AdminComponentList'));
