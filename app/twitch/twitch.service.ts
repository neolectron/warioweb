import { Twitch } from 'arctic';
import { env } from '../config/env.config';

export const getAuthTwitch = () =>
  new Twitch(
    env.AUTH_TWITCH_ID,
    env.AUTH_TWITCH_SECRET,
    env.AUTH_TWITCH_REDIRECT_URI
  );

type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
  email: string;
  created_at: string;
};
// --
export const getTwitchUser = async (
  clientId: string,
  accessToken: string,
  { signal }: { signal?: AbortSignal }
) => {
  const response = await fetch('https://api.twitch.tv/helix/users', {
    signal,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Client-Id': clientId,
    },
  });
  const json = await response.json();
  return json.data[0] as TwitchUser;
};
