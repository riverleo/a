import { parse, format } from './url';

describe('url.js', () => {
  describe('parse', () => {
    it('경로와 파라미터를 잘 분리하는가?', () => {
      const rawURL = '/works?ssid=abcd&created=0';
      const { path, params } = parse(rawURL);

      expect(path).toBe('/works');
      expect(params).toHaveProperty('ssid', 'abcd');
      expect(params).toHaveProperty('created', '0');
    });
  });

  describe('format', () => {
    it('경로와 파라미터를 잘 합치는가?', () => {
      expect(format({ path: '/works', params: { key: 'value' } })).toBe('/works?key=value');
      expect(format({ path: '/works', params: { key1: 'value1', key2: 'value2' } })).toBe('/works?key1=value1&key2=value2');
    });
  });
});
