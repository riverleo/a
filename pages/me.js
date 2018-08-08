import React from 'react';
import withProvider from '../lib/withProvider';
import { App } from '../components/core';
import User from '../components/User';

export default withProvider(() => (
  <App>
    <User />
  </App>
));
