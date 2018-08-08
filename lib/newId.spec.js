import _ from 'lodash';
import newId from './newId';

describe('#newId', () => {
  it('기본', () => {
    expect(newId()).toBeDefined();
  });

  it('길이 조절', () => {
    expect(newId()).toHaveLength(11); // 기본 길이
    expect(newId(6)).toHaveLength(6);
    expect(newId(7)).toHaveLength(7);
    expect(newId(1000)).toHaveLength(1000);
  });

  it('동일한 아이디가 생성되는지 확인', () => {
    const loopCount = 100;
    const id = newId();

    _.times(loopCount, () => {
      expect(id).not.toEqual(newId());
    });
  });
});
