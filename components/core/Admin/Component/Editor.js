import _ from 'lodash';
import React, { Component } from 'react';
import {
  func,
  shape,
  string,
  object,
  objectOf,
} from 'prop-types';
import CodeMirror from 'react-codemirror';
import styled from '../../../../lib/styled';
import { connect } from '../../../../lib/store';
import { deselect } from './redux';
import { set, update, remove } from '../../redux/component';

const mapStateToProps = state => ({
  admin: state.core.admin.component,
  component: state.core.component,
});

if (process.browser) {
  require('codemirror/mode/sass/sass'); // eslint-disable-line global-require
}

class Editor extends Component {
  static propTypes = {
    admin: shape({
      selected: shape({
        key: string.isRequired,
        style: string,
      }),
    }).isRequired,
    dispatch: func.isRequired,
    component: objectOf(object).isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func.isRequired,
  }

  handleClickSave = () => {
    const { dispatch, admin, component } = this.props;
    const { key } = admin.selected;

    dispatch(update(component[key]));
  }

  handleClickBack = () => {
    this.props.dispatch(deselect());
  }

  handleClickRemove = id => () => {
    const { dispatch } = this.props;

    dispatch(remove(id));
    dispatch(deselect());
  }

  handleChangeStyle = (style) => {
    const { dispatch, admin } = this.props;
    const changed = _.assign({}, admin.selected, { style });

    dispatch(set(changed));
  }

  render() {
    const { t } = this.context;
    const { className, admin } = this.props;
    const { id, key, style } = admin.selected;

    return (
      <div className={className}>
        <h1>{key}</h1>
        <nav>
          <ul>
            <li>
              <button onClick={this.handleClickBack}>
                {t('coreAdminBack')}
              </button>
            </li>
            <li>
              <button onClick={this.handleClickSave}>
                {t('coreAdminSave')}
              </button>
            </li>
          </ul>
          <ul>
            <li>
              <button onClick={this.handleClickRemove(id)}>
                {t('coreAdminRemove')}
              </button>
            </li>
          </ul>
        </nav>
        <CodeMirror
          ref={(el) => { this.el = el; }}
          value={style}
          onChange={this.handleChangeStyle}
          options={{
            mode: 'sass',
            tabSize: 2,
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Editor, 'AdminComponentEditor'));
