import _ from 'lodash';
import React, { Component } from 'react';
import {
  func,
  shape,
  object,
  string,
  arrayOf,
  objectOf,
} from 'prop-types';
import CodeMirror from 'react-codemirror';
import { connect } from '../../../../lib/store';
import styled from '../../../../lib/styled';
import { change, deselect } from './redux';
import { set } from '../../redux/message';

if (process.browser) {
  require('codemirror/mode/htmlembedded/htmlembedded'); // eslint-disable-line global-require
}

const mapStateToProps = state => ({
  admin: state.core.admin.message,
  locale: state.core.locale,
  message: state.core.message,
});

class Editor extends Component {
  static propTypes = {
    admin: shape({
      selected: shape({
        key: string.isRequired,
        translations: arrayOf(shape({
          lcid: string.isRequired,
          body: string,
        })),
      }).isRequired,
    }).isRequired,
    locale: shape({
      data: arrayOf(shape({
        lcid: string.isRequired,
      })),
    }).isRequired,
    message: objectOf(object).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func.isRequired,
  }

  handleChange = ({ key, lcid }) => (body) => {
    const { dispatch } = this.props;
    const changed = { key, lcid, body };

    dispatch(set(changed));
    dispatch(change(changed));
  }

  handleClickBack = () => {
    this.props.dispatch(deselect());
  }

  render() {
    const { t } = this.context;
    const {
      admin,
      locale,
      message,
      className,
    } = this.props;
    const { key } = admin.selected;

    return (
      <div className={className}>
        <h1>{key}</h1>
        <button onClick={this.handleClickBack}>
          {t('coreAdminBack')}
        </button>
        <ul>
          {
            _.map(locale.data, ({ lcid }) => {
              const changed = _.get(message, [lcid, key], '');

              return (
                <li key={lcid}>
                  <CodeMirror
                    ref={(el) => { this.el = el; }}
                    value={changed}
                    onChange={this.handleChange({ key, lcid })}
                    options={{
                      mode: 'htmlembedded',
                      tabSize: 2,
                    }}
                  />
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Editor, 'AdminMessageEditor'));
