import dotenv from 'dotenv';
dotenv.config();

import { Log } from './Log';

const origin = (): string | string[] => {
  if (!process.env.ORIGIN) {
    Log.warn("ORIGIN is not provided in .env. '*' will be used by default.");
    return '*';
  }
  if (process.env.ORIGIN.startsWith('[')) {
    return JSON.parse(process.env.ORIGIN);
  }
  return process.env.ORIGIN;
};

const getPort = (): number => {
  // Render provides the PORT env var for production
  if (process.env.PORT) {
    return parseInt(process.env.PORT, 10);
  }

  // Fallback for local development, assigning different ports
  const isWs = process.argv.includes('--ws');
  return parseInt(isWs ? process.env.WS_PORT || '3002' : process.env.API_PORT || '3001', 10);
};

export default {
  DEV_MODE: process.env.DEV_MODE === 'true',
  PORT: process.env.DEV_MODE ? getPort() : parseInt(process.env.PORT || '3000'),
  JWT_SECRET: process.env.JWT_SECRET as string,
  CONNECTIONS_SECRET: process.env.CONNECTIONS_SECRET as string,
  JWT_CONNECTIONS_SECRET: process.env.JWT_CONNECTIONS_SECRET as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  REDIS_URL: process.env.REDIS_URL as string,
  REDIS_HOST: process.env.REDIS_HOST as string,
  REDIS_PORT: parseInt(process.env.REDIS_PORT as string),
  REDIS_PASS: process.env.REDIS_PASS as string,
  ORIGIN: origin(),
  CLIENT_URL: process.env.CLIENT_URL as string,
  NERIMITY_CDN: process.env.NERIMITY_CDN as string,
  LOCAL_NERIMITY_CDN: process.env.LOCAL_NERIMITY_CDN as string,
  NERIMITY_CDN_SECRET: process.env.NERIMITY_CDN_SECRET as string,

  MAX_CHANNELS_PER_SERVER: parseInt(process.env.MAX_CHANNELS_PER_SERVER || '0') as number,
  MAX_INVITES_PER_SERVER: parseInt(process.env.MAX_INVITES_PER_SERVER || '0') as number,
  MAX_ROLES_PER_SERVER: parseInt(process.env.MAX_ROLES_PER_SERVER || '0') as number,

  DEFAULT_SERVER_ROLE_COLOR: process.env.DEFAULT_SERVER_ROLE_COLOR as string,
  OFFICIAL_SERVER_ID: process.env.OFFICIAL_SERVER_ID as string,

  TURNSTILE_SECRET: process.env.TURNSTILE_SECRET as string,
  CLOUDFLARE_CALLS_ID: process.env.CLOUDFLARE_CALLS_ID as string,
  CLOUDFLARE_CALLS_TOKEN: process.env.CLOUDFLARE_CALLS_TOKEN as string,

  SMTP_USER: process.env.SMTP_USER as string,
  SMTP_PASS: process.env.SMTP_PASS as string,
  SMTP_FROM: process.env.SMTP_FROM as string,
  SMTP_HOST: process.env.SMTP_HOST as string,
  SMTP_PORT: parseInt(process.env.SMTP_PORT as string),

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL as string,
  TENOR_API_KEY: process.env.TENOR_API_KEY as string,
  CLUSTER_INDEX: parseInt(process.env.CLUSTER_INDEX as string),
  OPTIMIZE_API_KEY: process.env.OPTIMIZE_API_KEY as string,
  TYPE: (process.argv.includes('--ws') ? 'ws' : process.argv.includes('--worker') ? 'worker' : 'api') as 'api' | 'ws' | 'worker',
  EXTERNAL_EMBED_SECRET: process.env.EXTERNAL_EMBED_SECRET as string,
};
