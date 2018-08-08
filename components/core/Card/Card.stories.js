import React from 'react';
import { storiesOf } from '@storybook/react';
import Card from '../Card';

const name = 'Card';

storiesOf(name, module)
.add('작은 크기', () => {
  const data = {
    title: 'What is the Pizza Capital of the US?',
    subtitle: 'When it comes to restaurants, every US city has a unique...',
    image: 'https://cdn-images-1.medium.com/fit/c/328/164/0*0FQmnpJsuGskv2g_.',
  };

  return <Card data={data} />;
})
.add('큰 크기', () => {
  const data = {
    title: 'What is the Pizza Capital of the US?',
    subtitle: 'When it comes to restaurants, every US city has a unique...',
    image: 'https://cdn-images-1.medium.com/fit/c/328/164/0*0FQmnpJsuGskv2g_.',
  };

  return <Card type="large" data={data} />;
});
