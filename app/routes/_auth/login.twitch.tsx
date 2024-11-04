import { createFileRoute, redirect } from '@tanstack/react-router';
import { generateState } from 'arctic';
import { setCookie } from 'vinxi/http';
import { env } from '../../config/env.config';

export const Route = createFileRoute('/_auth/login/twitch')({
  beforeLoad: async ({ context, location }) => {
    const state = generateState();
    const { client } = context.auth.twitch;
    const url = client.createAuthorizationURL(state, [
      'user:read:email',
      'user:read:subscriptions',
    ]);

    setCookie('state', state, {
      secure: env.PROD,
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10, // 10 min
    });
    throw redirect({
      href: url.toString(),
      from: '/login/twitch',
    });
  },
});
