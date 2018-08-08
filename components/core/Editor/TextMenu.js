/* global document */

import cn from 'classnames';
import { string, func } from 'prop-types';
import React, { Component } from 'react';
import styled from '../../../lib/styled';

class TextMenu extends Component {
  static propTypes = {
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  handleClickBold = () => {
    document.execCommand('bold');
  }

  handleClickItalic = () => {
    document.execCommand('italic');
  }

  handleClickUnderline = () => {
    document.execCommand('underline');
  }

  render() {
    const { t } = this.context;
    const { className } = this.props;

    return (
      <nav className={cn('clearfix', className)}>
        <div className="style">
          <button onClick={this.handleClickBold}>
            B
          </button>
          <button onClick={this.handleClickItalic}>
            I
          </button>
          <button onClick={this.handleClickUnderline}>
            U
          </button>
        </div>
        <div className="type">
          <button>
            {t('coreEditorMenuTitle')}
          </button>
          <button>
            {t('coreEditorMenuChapter')}
          </button>
          <button>
            {t('coreEditorMenuBody')}
          </button>
          <button>
            {t('coreEditorMenuQuote')}
          </button>
        </div>
      </nav>
    );
  }
}

export default styled(TextMenu, 'EditorTextMenu');
