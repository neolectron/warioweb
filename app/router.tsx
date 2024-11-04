import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { getAuthTwitch } from './twitch/twitch.service';

const twitch = getAuthTwitch();

export function createRouter() {
  const router = createTanStackRouter({
    context: { auth: { twitch } },
    routeTree,
  });

  return router;
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
