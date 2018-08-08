import _ from 'lodash';
import { connect } from 'react-redux';

/**
 * 모든 `Redux` 컴포넌트에 포함되어햘 프로퍼티들을 정의합니다.
 */
export default mapStateToProps => connect(state => _.assign({}, mapStateToProps(state), {
  $$message: state.core.message,
}));
