import _ from 'lodash';
import React, { Component } from 'react';
import {
  func,
  shape,
  string,
  object,
  arrayOf,
} from 'prop-types';
import styled from '../../../lib/styled';
import newId from '../../../lib/newId';
import { connect } from '../../../lib/store';
import { getIdFromPath } from '../lib';
import { get, set, upsert, remove } from './redux';
import Editor from '../../core/Editor';

const mapStateToProps = state => ({
  route: state.core.route,
  newOrEdit: state.work.newOrEdit,
});

class NewOrEdit extends Component {
  static propTypes = {
    route: shape({
      path: string.isRequired,
    }).isRequired,
    newOrEdit: shape({
      data: shape({
        id: string.isRequired,
        contents: arrayOf(object).isRequired,
      }),
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    const id = getIdFromPath(route.path);

    if (_.isNil(id)) { return; }

    dispatch(get({ id }));
  }

  handleChange = (contents) => {
    const { dispatch, newOrEdit } = this.props;
    const { data, changed: oldChanged } = newOrEdit;
    const changed = { ...data, ...oldChanged, contents };

    if (_.isNil(changed.id)) {
      changed.id = newId();
    }

    dispatch(set({ changed }));
  }

  handleClickSave = () => this.props.dispatch(upsert())

  handleClickRemove = () => this.props.dispatch(remove())

  render() {
    const { t } = this.context;
    const { newOrEdit, className } = this.props;
    const { data, changed } = newOrEdit;
    const { contents } = changed || data || {};

    return (
      <div className={className}>
        <nav>
          <button
            className="btnSave"
            onClick={this.handleClickSave}
          >
            {t('coreEditorSave')}
          </button>
          <button
            className="btnRemove"
            onClick={this.handleClickRemove}
          >
            {t('coreEditorRemove')}
          </button>
        </nav>
        <Editor
          contents={contents}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(NewOrEdit, 'WorkNewOrEdit'));
