import _ from 'lodash';

/**
 * 커서가 들어오거나 추가 텍스트가 입력될 수 있는 위치를 찾습니다.
 */
export default (targetHTML, candidateIndex = Number.MAX_SAFE_INTEGER) => {
  let html = targetHTML;
  const regex = /<\/[a-zA-Z]+>$/g;

  while (regex.test(html)) {
    html = html.replace(regex, '');
  }

  return _.min([candidateIndex, html.length]);
};
