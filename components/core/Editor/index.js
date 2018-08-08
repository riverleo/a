import _ from 'lodash';
import React, { Component } from 'react';
import {
  func,
  bool,
  shape,
  object,
  string,
  arrayOf,
} from 'prop-types';
import { add, change } from './lib';
import {
  putCaret,
  getSelection,
  getSelectionRect,
  findIndexOfCaret,
} from './lib/caret';
import newId from '../../../lib/newId';
import styled from '../../../lib/styled';
import { connect } from '../../../lib/store';
import TextMenu from './TextMenu';
import ContentMenu from './ContentMenu';
import { set, change as change_ } from './redux';
import Content, { types } from './Content';

const mapStateToProps = state => ({
  editor: state.core.editor,
});

class Editor extends Component {
  static propTypes = {
    editable: bool,
    contents: arrayOf(object),
    editor: shape({
      active: string,
    }).isRequired,
    onChange: func,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  static defaultProps = {
    editable: true,
    onChange: __ => __,
    contents: undefined,
  }

  constructor(props) {
    super(props);

    this.el = React.createRef();
    this.state = { id: newId() };
  }

  componentDidMount() {
    const { id } = this.state;
    const { dispatch, contents } = this.props;
    const contentId = _.get(contents, [0, 'id']);

    dispatch(set({ active: id, [id]: { contents } }));

    if (_.has(this, contentId)) {
      setTimeout(() => this[contentId].focus(), 10);
    }
  }

  componentWillUnmount() {
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch(set({ active: undefined, [id]: undefined }));
  }

  getActiveProps = () => {
    const { id } = this.state;
    const { editor, contents } = this.props;

    if (!_.isNil(contents)) {
      return { ...editor[id], contents };
    }

    return editor[id] || {};
  }

  handleAdd = (content) => {
    let { contents } = this.getActiveProps();

    if (_.isArray(content)) {
      _.forEach(content, (c) => {
        contents = add({ contents, content: c });
      });
    } else {
      contents = add({ contents, content });
    }

    const lastContent = _.last(contents);

    this.handleChange(contents);
    setTimeout(() => this[lastContent.id].focus(), 10);
  }

  handleChange = (contents) => {
    const { dispatch, onChange } = this.props;

    onChange(contents);
    dispatch(change_(contents));
  }

  handleMove = (target) => {
    this[target.id].focus();
  }

  handleMerge = ({ contents, merged, target }) => {
    this.handleChange(contents);

    setTimeout(() => putCaret(this[merged.id].getDOM(), findIndexOfCaret(target.html)));
  }

  handleSplit = ({ contents, created }) => {
    this.handleChange(contents);

    setTimeout(() => this[created.id].focus(), 10);
  }

  handleInput = (content) => {
    const { contents } = this.getActiveProps();

    this.handleChange(change({ contents, content }));
  }

  handleSelect = () => {
    const { dispatch } = this.props;
    const parentRect = this.el.current.getBoundingClientRect() || {};
    const selectionRect = getSelectionRect() || {};

    dispatch(change_({
      menu: {
        rect: {
          top: selectionRect.top - parentRect.top,
          left: selectionRect.left - parentRect.left,
          width: selectionRect.width,
          height: selectionRect.height,
        },
        show: getSelection('text') !== '',
      },
    }));
  }

  handleClickFirstAdd = () => {
    const content = { id: newId(), type: types.BODY, html: '' };

    this.handleAdd(content);
  }

  isEmpty = () => {
    const { contents } = this.getActiveProps();

    if (_.size(contents) < 1) { return true; }

    const type = _.get(contents, [0, 'type']);
    const html = _.get(contents, [0, 'html']);

    if (type === types.BODY && _.isEmpty(html)) { return true; }

    return false;
  }

  render() {
    const { t } = this.context;
    const { editable, className } = this.props;
    const { menu, contents } = this.getActiveProps();

    return (
      <div
        ref={this.el}
        role="presentation"
        onKeyUp={this.handleSelect}
        onMouseUp={this.handleSelect}
        className={className}
      >
        {
          editable &&
            <ContentMenu onAdd={this.handleAdd} />
        }
        {
          this.isEmpty() &&
            <button
              onClick={this.handleClickFirstAdd}
              className="placeholder"
            >
              {t('coreEditorPlaceholder')}
            </button>
        }
        {
          _.size(contents) > 0 &&
            <div className="contents">
              {
                _.map(contents, content => (
                  <Content
                    key={content.id}
                    content={content}
                    contents={contents}
                    editable={editable}
                    ref={(el) => { this[content.id] = el; }}
                    onMove={this.handleMove}
                    onMerge={this.handleMerge}
                    onSplit={this.handleSplit}
                    onInput={this.handleInput}
                  />
                ))
              }
            </div>
        }
        {editable && _.get(menu, 'show') && <TextMenu />}
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Editor, 'Editor'));
