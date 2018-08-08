/* eslint-disable react/no-danger */

import _ from 'lodash';
import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Head, Main, NextScript } from 'next/document';
import initStyle from '../lib/initStyle';

export default class extends Document {
  static getInitialProps({ renderPage, req }) {
    const {
      messages,
      currentLocale,
      localeDataScript,
    } = req;

    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();

    return {
      messages,
      styleTags,
      currentLocale,
      localeDataScript,
      ...page,
    };
  }

  render() {
    const {
      html,
      head,
      styleTags,
      currentLocale,
      localeDataScript,
    } = this.props;

    return (
      <html lang={currentLocale}>
        <Head>
          <title>-</title>
          <meta name="viewport" content="width=device-width, user-scalable=no" />
          {head}
          {initStyle()}
          <link rel="stylesheet" href="//fonts.googleapis.com/earlyaccess/notosanskr.css" />
          <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.35.0/codemirror.min.css" />
          <link rel="stylesheet" href="//static.wslo.co/icomoon/style.css?v=1" />
          {styleTags}
        </Head>
        <body>
          <Main />
          {
            _.map(localeDataScript, script => (
              <script dangerouslySetInnerHTML={{ __html: script }} />
            ))
          }
          <NextScript />
        </body>
      </html>
    );
  }
}
