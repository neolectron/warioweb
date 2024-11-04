import { Link, ScrollRestoration } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Body, Head, Html, Meta, Scripts } from '@tanstack/start';
import type { PropsWithChildren } from 'react';

export const App = ({ children }: PropsWithChildren<object>) => (
  <Html>
    <Head>
      <Meta />
    </Head>
    <Body>
      <nav>
        <Link
          to="/"
          activeProps={{
            style: { fontWeight: 'bold' },
          }}
          activeOptions={{ exact: true }}
        >
          Home
        </Link>
        <br />
        <Link
          to="/about"
          activeProps={{
            style: { fontWeight: 'bold' },
          }}
        >
          About
        </Link>
      </nav>
      <hr />
      {children}
      <ScrollRestoration />
      <TanStackRouterDevtools position="bottom-right" />
      <Scripts />
    </Body>
  </Html>
);
