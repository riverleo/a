import Link from 'next/link';
import React, { Component } from 'react';
import {
  func,
  shape,
  string,
  object,
  arrayOf,
} from 'prop-types';
import styled from '../../../lib/styled';
import { connect } from '../../../lib/store';
import { getIdFromPath } from '../lib';
import { get } from './redux';
import Editor from '../../core/Editor';

const mapStateToProps = state => ({
  route: state.core.route,
  detail: state.work.detail,
});

class Detail extends Component {
  static propTypes = {
    route: shape({
      path: string.isRequired,
    }).isRequired,
    detail: shape({
      data: shape({
        id: string.isRequired,
        contents: arrayOf(object).isRequired,
      }),
    }).isRequired,
    dispatch: func.isRequired,
    className: string.isRequired,
  }

  static contextTypes = {
    t: func,
  }

  componentDidMount() {
    const { dispatch, route } = this.props;
    const id = getIdFromPath(route.path);

    dispatch(get({ id }));
  }

  render() {
    const { t } = this.context;
    const { detail, className } = this.props;
    const { id, contents } = detail.data || {};

    return (
      <div className={className}>
        <nav>
          <Link
            href={{
              id,
              action: 'edit',
              pathname: '/works',
            }}
            as={`/works/${id}/edit`}
          >
            <a>{t('workDetailEdit')}</a>
          </Link>
        </nav>
        <Editor
          editable={false}
          contents={contents}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(styled(Detail, 'WorkDetail'));
