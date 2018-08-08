import React from 'react';
import { string, node } from 'prop-types';
import styled from '../../lib/styled';

const Container = ({ children, className }) => (
  <div className={className}>
    {children}
  </div>
);

Container.propTypes = {
  children: node,
  className: string.isRequired,
};

Container.defaultProps = {
  children: undefined,
};

export default styled(Container, 'Container');
