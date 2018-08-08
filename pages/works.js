import React from 'react';
import withProvider from '../lib/withProvider';
import { App } from '../components/core';
import Work from '../components/Work';

export default withProvider(() => <App><Work /></App>);
