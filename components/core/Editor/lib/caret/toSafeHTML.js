import _ from 'lodash';

export const cleanup = (str) => {
  let cleaned = str;

  // 태그가 깨진 경우
  const regexOfBroken = /(^(<\/|\/)?[a-zA-Z]*>|<\/?[a-zA-Z]*$)/g;

  while (regexOfBroken.test(cleaned)) {
    cleaned = cleaned.replace(regexOfBroken, '');
  }

  // 태그가 중복된 경우
  const matches = _.map(cleaned.match(/<\/?[a-zA-Z]+>/g), s => s.replace(/(<|>|\/)/g, ''));

  _.forEach(_.countBy(matches), (count, tagName) => {
    if (count < 2) { return; }

    const endTag = `</${tagName}>`;
    const startTag = `<${tagName}>`;
    const indexOfEnd = cleaned.lastIndexOf(endTag);
    const indexOfStart = cleaned.indexOf(startTag) + _.size(startTag);

    if (indexOfStart > 0 && indexOfEnd > 0) {
      const regexOfTag = new RegExp(`</?${tagName}>`, 'g');
      cleaned =
        cleaned.substring(0, indexOfStart) +
        cleaned.substring(indexOfStart, indexOfEnd).replace(regexOfTag, '') +
        cleaned.substring(indexOfEnd);
    }

    cleaned = cleaned.replace(new RegExp(`</${tagName}><${tagName}>`, 'g'), '');
  });

  return cleaned;
};

export default (candidateHTML) => {
  let html = cleanup(candidateHTML);

  const matchedEndTags = html.match(/<\/[a-zA-Z]+>/g);
  const matchedStartTags = _.reverse(html.match(/<[a-zA-Z]+>/g));

  if (!_.isNil(matchedEndTags)) {
    _.forEach(matchedEndTags, (tag) => {
      const tagName = tag.replace(/(<|>|\/)/g, '');

      if (!_.includes(html, `<${tagName}>`)) {
        html = `<${tagName}>${html}`;
      }
    });
  }

  if (!_.isNil(matchedStartTags)) {
    _.forEach(matchedStartTags, (tag) => {
      const tagName = tag.replace(/(<|>|\/)/g, '');

      if (!_.includes(html, `</${tagName}>`)) {
        html = `${html}</${tagName}>`;
      }
    });
  }

  return html;
};
