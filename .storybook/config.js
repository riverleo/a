import { configure, addDecorator } from '@storybook/react';
import { withTests } from '@storybook/addon-jest';
import results from '../jest-test-results.json';

addDecorator(withTests({ results })(name));

const req = require.context(
  '../components',
  true,
  /\.stories\.(js|jsx)$/,
)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module);
