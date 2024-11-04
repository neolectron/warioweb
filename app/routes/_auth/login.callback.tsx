import { createFileRoute, redirect } from '@tanstack/react-router';
import { ArcticFetchError, OAuth2RequestError } from 'arctic';
import { getCookie, setCookie } from 'vinxi/http';
import { env } from '../../config/env.config';
import logger from '../../logger/logger';

export const Route = createFileRoute('/_auth/login/callback')({
  validateSearch: (search) => {
    if (
      typeof search.code !== 'string' ||
      typeof search.scope !== 'string' ||
      typeof search.state !== 'string'
    ) {
      throw new Error('Invalid search params');
    }

    return {
      code: search.code,
      scope: search.scope,
      state: search.state,
    };
  },
  beforeLoad: async ({
    context: {
      auth: { twitch },
    },
    search,
  }) => {
    const { code, state } = search;
    const storedState = getCookie('state');

    if (storedState === undefined || state !== storedState) {
      console.error('invalid code or state - 400 bad request');
      redirect({
        throw: true,
        from: '/login/callback',
        to: '/',
        statusCode: 400,
      });
    }

    try {
      logger.log('validating code');
      const tokens = await twitch.client
        .validateAuthorizationCode(code)
        .catch((e: unknown) => {
          console.error('error validating code', e);
          throw e;
        });
      const refreshToken = tokens.refreshToken();
      const accessToken = tokens.accessToken();
      const accessTokenExpiresInSeconds = tokens.accessTokenExpiresInSeconds();

      setCookie('accessToken', accessToken, {
        secure: env.PROD,
        sameSite: env.PROD ? 'strict' : 'lax',
        //TODO: check in prod if we can move to strict
        path: '/',
        httpOnly: true,
        maxAge: accessTokenExpiresInSeconds,
      });

      setCookie('refreshToken', refreshToken, {
        secure: env.PROD,
        sameSite: 'strict',
        path: '/',
        httpOnly: true,
        maxAge: 31536e3,
      });

      redirect({
        throw: true,
        from: '/login/callback',
        to: '/',
      });
    } catch (e) {
      if (e instanceof OAuth2RequestError)
        throw new Error(
          `Invalid authorization code, credentials, or redirect URI. code: ${e.code}`
        );
      if (e instanceof ArcticFetchError)
        throw new Error(
          'sendTokenRequest Faileded to call `fetch()` to request tokens',
          {
            cause: e,
          }
        );
      throw e;
    }
  },
  // loader: () => {
  //   throw redirect({
  //     from: '/login/callback',
  //     to: '/',
  //   });
  // },
});
