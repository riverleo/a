import React from 'react';
import { storiesOf } from '@storybook/react';
import withProvider from '../../../lib/withProvider';
import Login from '../Login';

const name = 'Login';

storiesOf(name, module)
.addDecorator((storyFn) => {
  const Provided = withProvider(() => storyFn());

  return <Provided />;
})
.add('기본', () => <Login />);
