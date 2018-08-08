/* global document */

import _ from 'lodash';

export default (type = 'html') => {
  const selection = document.getSelection();

  switch (type) {
    case 'text':
      return selection.toString();
    case 'html':
    default: {
      const fakeNode = document.createElement('div');

      _.times(selection.rangeCount, (index) => {
        const content = selection.getRangeAt(index).cloneContents();
        fakeNode.appendChild(content);
      });

      return fakeNode.innerHTML;
    }
  }
};
