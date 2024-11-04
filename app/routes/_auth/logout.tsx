import { createFileRoute, redirect } from '@tanstack/react-router';
import { deleteCookie } from 'vinxi/http';

export const Route = createFileRoute('/_auth/logout')({
  beforeLoad: () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    redirect({
      throw: true,
      from: '/logout',
      to: '/',
    });
  },
});
