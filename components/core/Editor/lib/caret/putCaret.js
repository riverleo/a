/* global document */

import _ from 'lodash';
import { SECRET_DELIMETER } from '../caret';

const findSecretDelimeter = (el, removeIfExists = true) => {
  const f = (_el) => {
    let n;

    if (_el.hasChildNodes()) {
      _.forEach(_el.childNodes, (childNode) => {
        if (n) { return; }

        n = f(childNode);
      });
    }

    const index = _.indexOf(_el.data, SECRET_DELIMETER);

    if (index >= 0) {
      n = _el;
    }

    return n;
  };

  const node = f(el);

  if (_.isNil(node)) {
    console.warn('선택된 요소에서 구분자를 찾지 못했습니다', { el });

    return { node: undefined, index: -1 };
  }

  const index = _.indexOf(node.data, SECRET_DELIMETER);

  if (removeIfExists) {
    const regex = new RegExp(SECRET_DELIMETER, 'g');
    node.data = _.replace(node.data, regex, ''); // eslint-disable-line no-param-reassign
  }

  return { node, index };
};

export default (el, candidateIndex) => {
  let expectedIndex = candidateIndex;

  if (_.isNil(expectedIndex) || expectedIndex < 0 || expectedIndex > _.size(el.innerHTML)) {
    console.warn('예상 위치가 범위를 초과하거나 유효하지 않습니다.', { expectedIndex, html: el.innerHTML });
    expectedIndex = 0;
  }

  const prevHTML = el.innerHTML.substring(0, expectedIndex);
  const nextHTML = el.innerHTML.substring(expectedIndex);

  el.innerHTML = `${prevHTML}${SECRET_DELIMETER}${nextHTML}`; // eslint-disable-line no-param-reassign

  const { node, index } = findSecretDelimeter(el);

  if (_.isNil(node)) { return; }

  const range = document.createRange();
  const sel = document.getSelection();

  range.setStart(node, index);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
};
