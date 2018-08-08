import _ from 'lodash';
import { string, shape, func, arrayOf } from 'prop-types';
import React, { Component } from 'react';
import { connect } from '../../../../lib/store';
import styled from '../../../../lib/styled';
import { get, upsert } from './redux';
import ListItem from './ListItem';

const mapStateToProps = state => ({
  message: state.core.admin.message,
});

class List extends Component {
  static propTypes = {
    message: shape({
      data: arrayOf(shape({
      })),
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func.isRequired,
  }

  componentDidMount() {
    this.props.dispatch(get());
  }

  handleKeyDown = (e) => {
    if (e.keyCode !== 13) { return; }

    this.get();
  }

  handleClickSearch = () => {
    this.get();
  }

  handleClickCreate = () => {
    this.props.dispatch(upsert({ key: this.input.value }));
  }

  get = () => {
    const type = this.select.value;
    const params = { [type]: this.input.value };

    this.props.dispatch(get({ params }));
  }

  render() {
    const { t } = this.context;
    const { className, message } = this.props;
    const { data } = message;

    return (
      <div className={className}>
        <header>
          <select
            ref={(el) => { this.select = el; }}
            defaultValue="q"
          >
            <option value="q">{t('coreAdminMessageParamQuery')}</option>
            <option value="key">{t('coreAdminMessageParamKey')}</option>
          </select>
          <input
            ref={(el) => { this.input = el; }}
            type="text"
            onKeyDown={this.handleKeyDown}
          />
          <button onClick={this.handleClickSearch}>{t('coreAdminSearch')}</button>
          <button onClick={this.handleClickCreate}>{t('coreAdminCreate')}</button>
        </header>
        <ul>{_.map(data, m => <ListItem key={m.key} data={m} />)}</ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(List, 'AdminMessageList'));
