import App, { Container } from 'next/app';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import { UserSession, AppConfig } from 'blockstack';
import { configure } from 'radiks';
import * as linkify from 'linkifyjs';
import mentionPlugin from 'linkifyjs/plugins/mention';

import Nav from '../components/nav';
import Footer from '../components/footer';

mentionPlugin(linkify);

const appConfig = new AppConfig(['store_write', 'publish_data'], process.env.RADIKS_API_SERVER);
const userSession = new UserSession({ appConfig });

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {
      userSession,
    };

    configure({
      apiServer: process.env.RADIKS_API_SERVER,
      userSession,
    });

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentWillMount() {
    configure({
      apiServer: process.env.RADIKS_API_SERVER,
      userSession,
    });
  }

  render() {
    const {
      Component, pageProps,
    } = this.props;

    return (
      <ThemeProvider theme={{}}>
        <Container>
          <Nav />
          <Component {...pageProps} serverCookies={this.props.cookies} />
          <Footer />
        </Container>
      </ThemeProvider>
    );
  }
}

export default MyApp;
