import React from 'react';
import withProvider from '../lib/withProvider';
import { App } from '../components/core';
import List from '../components/User/List';

export default withProvider(() => (
  <App>
    <List />
  </App>
));
