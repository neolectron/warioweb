import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { DefaultCatchBoundary } from '../components/DefaultCatchBoundary';
import { NotFound } from '../components/NotFound';
import { App } from '../components/App';
import { env } from '../config/env.config';
import { getAuthTwitch } from '../twitch/twitch.service';
import logger from '../logger/logger';
import { StrictMode } from 'react';
import { ChakraProvider } from '../components/ChakraProvider';

const twitchClient = getAuthTwitch();

type RouterContext = {
  auth: {
    twitch: typeof twitchClient;
  };
};

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: ({ location, matches }) => {
    if (matches.length > 0) {
      logger.log(
        `beforeLoad(${location.pathname}) match ${matches.map((m) => m.id).join(' ')}`
      );
    }

    return {
      auth: {
        twitch: { client: twitchClient, clientID: env.AUTH_TWITCH_ID },
      },
    };
  },
  notFoundComponent: () => <NotFound />,
  errorComponent: (props) => (
    <App>
      <DefaultCatchBoundary {...props} />
    </App>
  ),
  component: () => (
    <StrictMode>
      <ChakraProvider>
        <App>
          <Outlet />
        </App>
      </ChakraProvider>
    </StrictMode>
  ),
  meta: () => [
    { title: 'Warioweb', charSet: 'utf-8' },
    { charSet: 'utf-8' },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
  links: () => [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon-180x180.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
  ],
});
