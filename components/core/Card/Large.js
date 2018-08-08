import React from 'react';
import { string, shape } from 'prop-types';
import styled from '../../../lib/styled';

const Large = ({ className, data }) => {
  const { title, subtitle, image } = data || {};

  return (
    <div className={className}>
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
    </div>
  );
};

Large.propTypes = {
  data: shape({
    title: string,
    subtitle: string,
    image: string,
  }).isRequired,
  className: string.isRequired,
};

export default styled(Large, 'CardLarge');
