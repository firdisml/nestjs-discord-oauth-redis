import { User } from '@prisma/client';

export type UserDetails = {
  discord_id: string;
  discord_tag: string;
  avatar: string;
  email: string;
};

export type OAuth2Details = {
  discord_id: string;
  access_token: string;
  refresh_token: string;
};

export type Done = (err: Error, user: User) => void;
