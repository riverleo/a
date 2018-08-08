/* global window */

export default () => {
  const selection = window.getSelection();

  if (selection.rangeCount === 0) {
    return undefined;
  }

  const range = selection.getRangeAt(0);

  return range.getBoundingClientRect();
};
