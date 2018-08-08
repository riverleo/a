/* global window */

import _ from 'lodash';
import React, { Component } from 'react';
import {
  func,
  shape,
  number,
  string,
  object,
  objectOf,
} from 'prop-types';
import {
  injectIntl,
  IntlProvider,
  addLocaleData,
  FormattedHTMLMessage,
} from 'react-intl';
import { connect } from '../store';

if (typeof window !== 'undefined' && window.ReactIntlLocaleData) {
  Object.keys(window.ReactIntlLocaleData).forEach((lang) => {
    addLocaleData(window.ReactIntlLocaleData[lang]);
  });
}

export default (ComposedComponent) => {
  const IntlComposedComponent = injectIntl(ComposedComponent);

  class IntlComponent extends Component {
    static contextTypes = {
      intl: object.isRequired,
    }

    static childContextTypes = {
      t: func,
    }

    getChildContext = () => ({
      t: (id, values) => {
        const { messages } = this.context.intl;
        const message = _.get(messages, `${id}`, '');

        if (/<[a-z][\s\S]*>/i.test(message)) {
          return <FormattedHTMLMessage id={id} values={values} />;
        }

        return this.context.intl.formatMessage({ id }, values);
      },
    })

    render() {
      return <IntlComposedComponent {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    locale: state.core.locale,
    message: state.core.message,
  });

  class IntlComponentProvider extends Component { // eslint-disable-line react/no-multi-comp
    static propTypes = {
      now: number,
      locale: shape({ current: string }).isRequired,
      message: objectOf(object).isRequired,
      messages: objectOf(object),
      currentLocale: string,
    }

    static defaultProps = {
      now: Date.now(),
      messages: undefined,
      currentLocale: undefined,
    }

    static async getInitialProps(ctx) {
      let props;

      if (typeof ComposedComponent.getInitialProps === 'function') {
        props = await ComposedComponent.getInitialProps(ctx);
      }

      const { req } = ctx;
      const { params, messages, currentLocale } = req || window.__NEXT_DATA__.props;

      return {
        params,
        messages,
        currentLocale,
        ...props,
      };
    }

    render() {
      const {
        now,
        locale,
        message,
        messages,
        currentLocale,
        ...props
      } = this.props;

      const _locale = locale.current || currentLocale || 'en-US';
      let _messages = _.isEmpty(message) ? messages : message;

      if (_.isEmpty(_messages)) {
        try {
          _messages = { [_locale]: require(`../../messages/${_locale}.json`) }; // eslint-disable-line global-require, import/no-dynamic-require
        } catch (e) {
          _messages = {};
        }
      }

      return (
        <IntlProvider
          locale={_locale}
          messages={_messages[_locale]}
          initialNow={now}
        >
          <IntlComponent {...props} />
        </IntlProvider>
      );
    }
  }

  return connect(mapStateToProps)(IntlComponentProvider);
};
