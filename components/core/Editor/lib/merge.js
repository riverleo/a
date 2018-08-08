import _ from 'lodash';
import { fromJS } from 'immutable';
import toSafeHTML from './caret/toSafeHTML';

export default ({ contents, originContent, targetContent }) => {
  const originContentIndex = _.findIndex(contents, c => c.id === originContent.id);
  const targetContentIndex = _.isNil(targetContent) ? originContentIndex - 1 : _.findIndex(contents, c => c.id === targetContent.id); // eslint-disable-line max-len

  if (_.isNil(contents[targetContentIndex])) {
    console.warn(`인덱스가 존재하지 않습니다. (id: ${targetContent.id}, index: ${targetContentIndex})`);
    return contents;
  }

  const html = toSafeHTML(contents[targetContentIndex].html + originContent.html);
  const merged = _.assign({}, targetContent, { html });

  return {
    merged,
    origin: originContent,
    target: targetContent,
    contents: fromJS(contents)
      .delete(originContentIndex)
      .set(targetContentIndex, merged)
      .toJS(),
  };
};
