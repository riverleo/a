import _ from 'lodash';
import cn from 'classnames';
import React, { Component } from 'react';
import {
  func,
  bool,
  shape,
  string,
  arrayOf,
} from 'prop-types';
import styled from '../../../../../lib/styled';
import withDnDContext from '../../../../../lib/withDnDContext';
import Draggable from './Draggable';

class Image extends Component {
  static propTypes = {
    content: shape({
      items: arrayOf(shape({
        id: string.isRequired,
      })),
    }),
    editable: bool.isRequired,
    className: string.isRequired,
    onInput: func.isRequired,
  }

  static defaultProps = {
    content: undefined,
  }

  handleDrop = (content) => {
    const { onInput } = this.props;

    onInput(content);
  }

  handleRemove = () => {
  }

  render() {
    const { content, editable, className } = this.props;

    return (
      <div className={cn('clearfix', className)}>
        {
          _.map(content.items, item => (
            <Draggable
              key={item.id}
              item={item}
              content={content}
              editable={editable}
              onDrop={this.handleDrop}
              onRemove={this.handleRemove}
            />
          ))
        }
      </div>
    );
  }
}

export default withDnDContext(styled(Image, 'EditorContentImage'));
