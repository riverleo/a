import findIndexOfCaret from './findIndexOfCaret';

describe('findIndexOfCaret.js', () => {
  it('위치가 지정되지 않았을 때', () => {
    expect(findIndexOfCaret('<b>hello,</b>world')).toBe('<b>hello,</b>world'.length);
    expect(findIndexOfCaret('<b>hello,world</b>')).toBe('<b>hello,world'.length);
    expect(findIndexOfCaret('<b>hello,<em>world</em></b>')).toBe('<b>hello,<em>world'.length);
  });

  it('위치가 지정되었을 때', () => {
  });

  it('위치가 범위를 초과했을 때', () => {
  });
});
