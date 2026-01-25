import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => {
  const nodeEnv = process.env.NODE_ENV!;

  const corsOrigin = process.env.CORS_ORIGIN!;
  const origin: boolean | string[] =
    corsOrigin === '*' ? true : corsOrigin.split(',').map((o) => o.trim());

  return {
    nodeEnv,
    isProduction: nodeEnv === 'production',
    isDevelopment: nodeEnv === 'development',
    port: parseInt(process.env.PORT!, 10),
    apiPrefix: process.env.API_PREFIX,
    corsOrigin: origin,
    throttle: {
      ttl: parseInt(process.env.THROTTLE_TTL!, 10),
      limit: parseInt(process.env.THROTTLE_LIMIT!, 10),
    },
  };
});
