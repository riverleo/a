import _ from 'lodash';
import React, { Component } from 'react';
import { object } from 'prop-types';
import { Provider } from 'react-redux';
import initStore from '../store';
import initServerState from '../serverState';

/**
 * 인자로 전달받은 컴포넌트를 `Redux`와 연동합니다. 초기화 함수(getInitialProps)가
 * 서버 사이드에서 실행되면서 필요한 데이터를 받아 초기화합니다.
 *
 * @param ComposedComponent {component} - 연동 대상 컴포넌트
 * @param cb {function} - `store`를 인자로 제공하는 콜백함수
 * @return {component} 초기화된 컴포넌트
 */
export default (ComposedComponent, cb) => (
  class ServerStateProvider extends Component {
    static displayName = `ServerStateProvider(${ComposedComponent.displayName})`
    static propTypes = {
      serverState: object, // eslint-disable-line react/forbid-prop-types
    }

    static defaultProps = {
      serverState: {},
    }

    constructor(props) {
      super(props);

      this.store = initStore(this.props.serverState);

      if (_.isFunction(cb)) {
        cb(this.store);
      }
    }

    static async getInitialProps(ctx) {
      let serverState = {};

      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      if (!process.browser) {
        const redux = initStore();
        const state = redux.getState();

        serverState = _.assign(state, await initServerState(ctx.req));
      }

      return {
        serverState,
        ...composedInitialProps,
      };
    }

    render() {
      return (
        <Provider store={this.store}>
          <ComposedComponent {...this.props} />
        </Provider>
      );
    }
  }
);
