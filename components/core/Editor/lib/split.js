import _ from 'lodash';
import { fromJS } from 'immutable';
import newId from '../../../../lib/newId';
import toSafeHTML from './caret/toSafeHTML';
import { types } from '../Content';

export default ({ contents, content, indexOfCaret }) => {
  const { id, html } = content || {};
  const index = _.findIndex(contents, c => c.id === id);

  const changedHTML = toSafeHTML(html.substring(0, indexOfCaret));
  const createdHTML = toSafeHTML(html.substring(indexOfCaret));
  const changed = _.assign({}, content, { html: changedHTML });
  const created = _.assign({}, content, { id: newId(), type: types.BODY, html: createdHTML });

  return {
    created,
    contents: fromJS(contents)
      .set(index, changed)
      .insert(index + 1, created)
      .toJS(),
  };
};
