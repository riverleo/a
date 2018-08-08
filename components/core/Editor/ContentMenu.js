import _ from 'lodash';
import React, { Component } from 'react';
import { func, string } from 'prop-types';
import styled from '../../../lib/styled';
import { createFiles } from '../../../lib/api';
import { types } from './Content';
import { parse, serialize } from './Content/Image/lib';

class ContentMenu extends Component {
  static propTypes = {
    onAdd: func.isRequired,
    className: string.isRequired,
  }

  handleChangeAddImage = async (e) => {
    const { onAdd } = this.props;
    const items = serialize(parse(_.get(await createFiles(e.target.files), ['data', 'data'])));

    const imageContent = { type: types.IMAGE, items };
    const bodyContent = { type: types.BODY, html: '' };

    onAdd([imageContent, bodyContent]);
  }

  render() {
    const { className } = this.props;

    return (
      <nav className={className}>
        <ul className="clearfix">
          <li>
            <button>
              <i className="icon-images" />
            </button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={this.handleChangeAddImage}
            />
          </li>
        </ul>
      </nav>
    );
  }
}

export default styled(ContentMenu, 'EditorContentMenu');
