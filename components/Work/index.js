import React from 'react';
import { string, shape } from 'prop-types';
import { connect } from '../../lib/store';
import List from './List';
import Detail from './Detail';
import NewOrEdit from './NewOrEdit';

const mapStateToProps = state => ({
  route: state.core.route,
});

const Work = ({ route }) => {
  const { path } = route;

  if (/works\/([a-zA-Z0-9]+\/edit|new)/.test(path)) {
    return <NewOrEdit />;
  }

  if (/works\/[a-zA-Z0-9]+/.test(path)) {
    return <Detail />;
  }

  return <List />;
};

Work.propTypes = {
  route: shape({
    path: string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Work);
