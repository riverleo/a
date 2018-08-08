import _ from 'lodash';
import React, { Component } from 'react';
import {
  bool,
  func,
  shape,
  string,
  object,
  objectOf,
} from 'prop-types';
import styled from '../../../../lib/styled';

class Body extends Component {
  static propTypes = {
    content: shape({
      html: string.isRequired,
    }).isRequired,
    onInput: func.isRequired,
    onKeyDown: func.isRequired,
    editable: bool.isRequired,
    inputRef: objectOf(object).isRequired,
    className: string.isRequired,
  }

  shouldComponentUpdate(nextProps) {
    const { html } = nextProps.content;

    if (_.isNil(html)) { return true; }
    if (_.isNil(this.props.inputRef.current)) { return true; }
    if (html !== this.props.inputRef.current.innerHTML) { return true; }

    return false;
  }

  render() {
    const {
      content,
      onInput,
      editable,
      inputRef,
      onKeyDown,
      className,
    } = this.props;
    const { html } = content;

    return (
      <p
        role="presentation"
        ref={inputRef}
        className={className}
        contentEditable={editable}
        dangerouslySetInnerHTML={{ __html: html }} // eslint-disable-line react/no-danger
        onInput={onInput}
        onKeyDown={onKeyDown}
      />
    );
  }
}

export default styled(Body, 'EditorContentBody');
