/* eslint-disable jsx-a11y/mouse-events-have-key-events */

import _ from 'lodash';
import cn from 'classnames';
import React, { Component } from 'react';
import { shape, string, func } from 'prop-types';
import styled from 'styled-components';
import { connect } from './store';
import { active, deactive } from '../components/core/Admin/Component/redux';

const mapStateToProps = state => ({
  $$admin: state.core.admin.component,
  $$component: state.core.component,
});

export default (ComposedComponent, key) => {
  const EditableComposedComponent = styled(({
    $active,
    className,
    $onMouseOut,
    $onMouseOver,
    $originClassName,
    ...props
  }) => (
    <div
      className={cn(className, { active: $active })}
      onMouseOut={$onMouseOut}
      onMouseOver={$onMouseOver}
    >
      <h1>{key}</h1>
      <ComposedComponent
        {...props}
        className={`$originClassName ${key}`}
      />
    </div>
  ))`
    & > h1 {
      display: none;
    }

    &.active {
      position: relative;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);

      & > h1 {
        left: 0;
        bottom: 0;
        display: block;
        margin: 0;
        padding: 5px 10px;
        position: absolute;
        color: white;
        font-size: 12px;
        background-color: rgba(0, 0, 0, 0.5);
        transform: translate(0, 100%);
      }
    }
  `;

  class StyledComponent extends Component {
    static propTypes = {
      $$admin: shape({
        actived: string,
      }).isRequired,
      dispatch: func.isRequired,
      className: string.isRequired,
    }

    handleMouseOut = (e) => {
      e.stopPropagation();

      this.props.dispatch(deactive(key));
    }

    handleMouseOver = (e) => {
      e.stopPropagation();

      this.props.dispatch(active(key));
    }

    render() {
      const { className, $$admin } = this.props;
      const { actived, mode } = $$admin;

      if (mode === 'edit') {
        return (
          <EditableComposedComponent
            $active={actived === key}
            $onMouseOut={this.handleMouseOut}
            $onMouseOver={this.handleMouseOver}
            $originClassName={className}
            {...this.props}
          />
        );
      }

      return (
        <ComposedComponent
          {...this.props}
          className={`${className} ${key}`}
        />
      );
    }
  }

  const getFunc = ({ $$component }) => _.get($$component, [key, 'style']);

  return connect(mapStateToProps)(styled(StyledComponent)`${getFunc})`);
};
