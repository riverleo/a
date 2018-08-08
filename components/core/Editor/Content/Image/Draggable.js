import _ from 'lodash';
import React, { Component } from 'react';
import {
  func,
  shape,
  number,
  string,
} from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import styled from '../../../../../lib/styled';
import { move } from './lib';

const sourceSpec = {
  canDrag: props => props.editable,
  beginDrag: props => props.item,
  isDragging: (props, monitor) => monitor.getItem().id === props.item.id,
};

const sourceCollect = (conn, monitor) => ({
  isDragging: monitor.isDragging(),
  connectDragSource: conn.dragSource(),
});

const targetSpec = {
  canDrop: props => props.editable,
  drop: (props, monitor) => {
    const { content, item, onDrop } = props;
    const droppedContent = move({ content, item: monitor.getItem(), path: item.path });

    onDrop(droppedContent);
  },
};

const targetCollect = (conn, monitor) => ({
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  connectDropTarget: conn.dropTarget(),
});

class Draggable extends Component {
  static propTypes = {
    item: shape({
      id: string.isRequired,
      color: string,
      meta: shape({
        width: number.isRequired,
        height: number.isRequired,
      }).isRequired,
    }).isRequired,
    className: string.isRequired,
    connectDropTarget: func.isRequired,
    connectDragSource: func.isRequired,
  }

  handle = () => {
  }

  render() {
    const {
      item,
      className,
      connectDropTarget,
      connectDragSource,
    } = this.props;
    const { id, color, meta } = item;
    const { height } = meta;

    return _.flow(
      connectDropTarget,
      connectDragSource,
    )(<div
      style={{
        width: '20%',
        height,
        float: 'left',
        backgroundImage: `url("https://file.wslo.co/${id}")`,
        backgroundColor: color,
      }}
      className={className}
    />);
  }
}

export default _.flow(
  DropTarget('ImageDraggable', targetSpec, targetCollect),
  DragSource('ImageDraggable', sourceSpec, sourceCollect),
)(styled(Draggable, 'EditorContentImageDraggable'));
