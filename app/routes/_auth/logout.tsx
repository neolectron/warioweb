import { createFileRoute, redirect } from '@tanstack/react-router';
import { deleteCookie } from 'vinxi/http';

export const Route = createFileRoute('/_auth/logout')({
  beforeLoad: () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    throw redirect({
      from: '/logout',
      to: '/',
    });
  },
});
