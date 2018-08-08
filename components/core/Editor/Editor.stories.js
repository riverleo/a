import React from 'react';
import { storiesOf } from '@storybook/react';
import newId from '../../../lib/newId';
import withProvider from '../../../lib/withProvider';
import Editor from '../Editor';

const name = 'Editor';

storiesOf(name, module)
.addDecorator((storyFn) => {
  const Provided = withProvider(() => storyFn());

  return <Provided />;
})
.add('기본', () => {
  const type = 'body';
  const workId = newId();

  return (
    <Editor
      work={{
        id: workId,
        contents: [
          {
            id: newId(),
            type,
            workId,
            html: '<b>First Body</b> Text',
          },
          {
            id: newId(),
            type,
            workId,
            html: 'Second Body Text',
          },
        ],
      }}
    />
  );
});
