import toSafeHTML, { cleanup } from './toSafeHTML';

describe('toSafeHTML.js', () => {
  describe('#cleanup', () => {
    it('정리가 필요하지 않은 경우', () => {
      expect(cleanup('hello,world')).toBe('hello,world');
      expect(cleanup('hello,&gt;b&lt;world')).toBe('hello,&gt;b&lt;world');
    });

    it('정리가 필요한 삽입된 경우', () => {
      expect(cleanup('hello,world<')).toBe('hello,world');
      expect(cleanup('hello,world<b')).toBe('hello,world');
      expect(cleanup('hello,<i>world</')).toBe('hello,<i>world');
      expect(cleanup('hello,<i>world</i')).toBe('hello,<i>world');
      expect(cleanup('>hello,world')).toBe('hello,world');
      expect(cleanup('b>hello,world')).toBe('hello,world');
      expect(cleanup('/b>hello,world')).toBe('hello,world');
      expect(cleanup('</b>hello,world')).toBe('hello,world');
    });

    it('중복된 태그로 묶인 경우', () => {
      expect(cleanup('<b>he</b><b>llo,</b>world')).toBe('<b>hello,</b>world');
      expect(cleanup('he</b><b>llo,</b>world')).toBe('hello,</b>world');
      expect(cleanup('<b>he<b>ll</b>o,</b>world')).toBe('<b>hello,</b>world');
      expect(cleanup('<b>he<em><b>ll</b></em>o,</b>world')).toBe('<b>he<em>ll</em>o,</b>world');
      expect(cleanup('<b>he<b><em>ll</em></b>o,</b>world')).toBe('<b>he<em>ll</em>o,</b>world');
    });
  });

  describe('#toSafeHTML', () => {
    it('일반 텍스트인 경우', () => {
      expect(toSafeHTML('hello,world')).toBe('hello,world');
      expect(toSafeHTML('hello,&gt;b&lt;world')).toBe('hello,&gt;b&lt;world');
    });

    it('태그가 완전히 잘려나간 경우', () => {
      expect(toSafeHTML('hello,</b>world')).toBe('<b>hello,</b>world');
      expect(toSafeHTML('hello,<i>world')).toBe('hello,<i>world</i>');
      expect(toSafeHTML('hello,</i><b>world')).toBe('<i>hello,</i><b>world</b>');
    });

    it('태그가 중첩된 경우', () => {
      expect(toSafeHTML('hello,<em><b>world')).toBe('hello,<em><b>world</b></em>');
      expect(toSafeHTML('<em>hello,<b>world')).toBe('<em>hello,<b>world</b></em>');
      expect(toSafeHTML('<em>hello</em>,<b>world')).toBe('<em>hello</em>,<b>world</b>');
      expect(toSafeHTML('hello,<em><b>world</b>')).toBe('hello,<em><b>world</b></em>');
      expect(toSafeHTML('hello,</b></em>world')).toBe('<em><b>hello,</b></em>world');
      expect(toSafeHTML('<q><u><b><i>hello,world')).toBe('<q><u><b><i>hello,world</i></b></u></q>');
      expect(toSafeHTML('<q><u>hello,<b><i>world')).toBe('<q><u>hello,<b><i>world</i></b></u></q>');
      expect(toSafeHTML('<q><u><b><i>hello,world</i></b>')).toBe('<q><u><b><i>hello,world</i></b></u></q>');
      expect(toSafeHTML('hello,world</i></b></u></q>')).toBe('<q><u><b><i>hello,world</i></b></u></q>');
    });

    it('태그가 부분적으로 잘려나간 경우', () => {
      expect(toSafeHTML('>hello,</em>world')).toBe('<em>hello,</em>world');
      expect(toSafeHTML('m>hello,</em>world')).toBe('<em>hello,</em>world');
      expect(toSafeHTML('em>hello,</em>world')).toBe('<em>hello,</em>world');
      expect(toSafeHTML('hello,<i>world<')).toBe('hello,<i>world</i>');
      expect(toSafeHTML('hello,<i>world</')).toBe('hello,<i>world</i>');
      expect(toSafeHTML('hello,<i>world</i')).toBe('hello,<i>world</i>');
    });

    it('태그 조각이 불필요하게 삽입된 경우', () => {
      expect(toSafeHTML('hello,world<')).toBe('hello,world');
      expect(toSafeHTML('hello,world<b')).toBe('hello,world');
      expect(toSafeHTML('>hello,world')).toBe('hello,world');
      expect(toSafeHTML('b>hello,world')).toBe('hello,world');
      expect(toSafeHTML('/b>hello,world')).toBe('hello,world');
      expect(toSafeHTML('</b>hello,world')).toBe('hello,world');
      expect(toSafeHTML('</u></b>hello,world')).toBe('hello,world');
    });
  });
});
