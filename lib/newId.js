import _ from 'lodash';

// https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const newId = (length = 11) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  _.times(length, () => {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  });

  return text;
};

export default newId;
