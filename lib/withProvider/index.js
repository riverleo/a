import withRedux from './withRedux';
import withReactIntl from './withReactIntl';

/**
 * HOC 방식의 초기화가 필요한 외부 라이브러리들을 연동합니다.
 * https://reactjs.org/docs/higher-order-components.html
 *
 * @param ComposedComponent {component} - 연동 대상 컴포넌트
 * @param cb {function} - `store`를 인자로 제공하는 콜백함수
 * @return {component} 초기화된 컴포넌트
 */
export default (ComposedComponent, cb) => (
  withRedux(withReactIntl(ComposedComponent), cb)
);
