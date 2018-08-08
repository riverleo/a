import _ from 'lodash';
import React, { Component } from 'react';
import {
  bool,
  func,
  oneOf,
  shape,
  string,
  object,
  arrayOf,
} from 'prop-types';
import Body from './Body';
import Code from './Code';
import Quote from './Quote';
import Chapter from './Chapter';
import Image from './Image';
import Headline from './Headline';
import * as caret from '../lib/caret';
import { split, merge } from '../lib';

export const types = {
  CODE: 'code',
  BODY: 'body',
  QUOTE: 'quote',
  IMAGE: 'image',
  CHAPTER: 'chapter',
  HEADLINE: 'headline',
};

class Content extends Component {
  static propTypes = {
    onMove: func,
    onMerge: func,
    onSplit: func,
    onInput: func,
    content: shape({
      id: string.isRequired,
      type: oneOf(_.values(types)).isRequired,
    }).isRequired,
    contents: arrayOf(object).isRequired,
    editable: bool.isRequired,
  }

  static defaultProps = {
    onMove: __ => __,
    onMerge: __ => __,
    onSplit: __ => __,
    onInput: __ => __,
  }

  constructor(props) {
    super(props);

    this.input = React.createRef();
  }

  getDOM = () => this.input.current

  focus = () => {
    const dom = this.getDOM();

    if (_.isNil(dom)) { return; }

    dom.focus();
  }

  /**
   * `onChange`와 같이 컴포넌트의 변경 이벤트를 바인딩합니다.
   * 변경된 내용은 `this.input.current.innerHTML` 또는 `this.input.current.innerText`로 불러옵니다.
   */
  handleInput = (newContent) => {
    const { onInput, content: oldContent } = this.props;
    const { current } = this.input;

    let content = oldContent;

    if (!_.isNil(newContent) && _.includes(_.values(types), _.get(newContent, 'type'))) {
      content = _.assign({}, oldContent, newContent);
    } else if (!_.isNil(current)) {
      content = _.assign({}, oldContent, { html: current.innerHTML });
    } else {
      console.warn(`'${content.type}' 컨텐츠의 'onInput' 함수가 올바르게 호출되고 있지 않습니다.`);
    }

    onInput(content);
  }

  /**
   * `handleInput` 함수가 호출되기 전에 실행됩니다.
   * 엔터 또는 ESC 키가 눌러졌을 때 실행될 이벤트들을 등록합니다.
   */
  handleKeyDown = (e) => {
    const {
      onMove,
      onSplit,
      onMerge,
      content,
      contents,
    } = this.props;

    switch (e.which) {
      case 8: {
        const selection = caret.getSelection();
        const indexOfCaret = caret.indexOfCaret(this.input.current, 'text');
        const indexOfContent = _.findIndex(contents, c => c.id === content.id);
        const targetContent = contents[indexOfContent - 1];

        if (_.isNil(targetContent)) { return; }
        if (selection !== '' || indexOfCaret !== 0) { return; }

        e.preventDefault();

        onMerge(merge({ contents, originContent: content, targetContent }));
        break;
      }
      case 13: {
        e.preventDefault();

        onSplit(split({ contents, content, indexOfCaret: caret.indexOfCaret(this.input.current) }));
        break;
      }
      case 38:
      case 40: {
        e.preventDefault();

        const indexOfContent = _.findIndex(contents, c => c.id === content.id);
        const target = contents[e.which === 38 ? indexOfContent - 1 : indexOfContent + 1];

        if (_.isNil(target)) { return; }

        onMove(target);
        break;
      }

      default:
    }
  }

  render() {
    const { content, editable } = this.props;
    const { type } = content;

    switch (type) {
      case types.CODE:
        return (
          <Code
            content={content}
            editable={editable}
            inputRef={this.input}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
          />
        );
      case types.BODY:
        return (
          <Body
            content={content}
            editable={editable}
            inputRef={this.input}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
          />
        );
      case types.QUOTE:
        return (
          <Quote
            content={content}
            editable={editable}
            inputRef={this.input}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
          />
        );
      case types.CHAPTER:
        return (
          <Chapter
            content={content}
            editable={editable}
            inputRef={this.input}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
          />
        );
      case types.IMAGE:
        return (
          <Image
            content={content}
            editable={editable}
            inputRef={this.input}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
          />
        );
      case types.HEADLINE:
        return (
          <Headline
            content={content}
            editable={editable}
            inputRef={this.input}
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
          />
        );
      default:
        return <div>Unsupport type ({String(type)})</div>;
    }
  }
}

export default Content;
