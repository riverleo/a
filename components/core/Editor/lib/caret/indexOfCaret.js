/* global window, document */

import { SECRET_DELIMETER } from '../caret';

export default (el, type = 'html') => {
  const delimeterNode = document.createTextNode(SECRET_DELIMETER);

  try {
    window.getSelection().getRangeAt(0).insertNode(delimeterNode);
  } catch (e) {
    console.warn('구분자를 삽입하는데 실패하였습니다.', window.getSelection());

    return -1;
  }

  let string = '';

  switch (type) {
    case 'text':
      string = el.innerText;
      break;
    case 'html':
    default:
      string = el.innerHTML;
  }

  delimeterNode.parentNode.removeChild(delimeterNode);

  return string.indexOf(SECRET_DELIMETER);
};
