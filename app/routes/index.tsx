import { getCookie } from 'vinxi/http';
import { createFileRoute, Link } from '@tanstack/react-router';
import { getTwitchUser } from '../twitch/twitch.service';

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    const accessToken = getCookie('accessToken');
    return { accessToken };
  },

  loader: async ({ context, abortController }) => {
    const { accessToken, auth } = context;
    const { signal } = abortController;

    if (!accessToken) return null;

    return getTwitchUser(auth.twitch.clientID, accessToken, { signal });
  },
  component: () => {
    const user = Route.useLoaderData();

    console.log({ user });

    if (!user) {
      return (
        <div>
          <h1>Home page!</h1>
          <Link from="/" to="/login/twitch">
            Login
          </Link>
        </div>
      );
    }
    return (
      <div>
        <h1>Welcome back {user.display_name}!</h1>
        <img src={user.profile_image_url} alt={user.display_name} />
        <pre>{JSON.stringify(user, null, 2)}</pre>
        <Link from="/" to="/logout">
          Logout
        </Link>
      </div>
    );
  },
});
