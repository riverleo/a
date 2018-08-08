import _ from 'lodash';
import core from './core';
import work from './work';

/**
 * 클라이언트 요청을 기반으로 각각의 상태(state)를 초기화합니다.
 * 서버 사이드에서 실행되면서 최초의 initialState 상태를 작성하고
 * 최종적으로 서버 렌더링 결과를 결정합니다.
 *
 * @param req {object} - HTTP Request
 */
export default async (req) => {
  const initialState = {};

  _.set(initialState, 'core', await core(req));
  _.set(initialState, 'work', await work(req));

  return initialState;
};
