import React from 'react';
import withProvider from '../lib/withProvider';
import { App } from '../components/core';
import Home from '../components/Home';

export default withProvider(() => (
  <App>
    <Home />
  </App>
));
