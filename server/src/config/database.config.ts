import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
  const DATABASE_URL = process.env.DATABASE_URL.replace(
    '<password>',
    DATABASE_PASSWORD,
  );
  return {
    DATABASE_URL,
    TOKEN_PRIVATE_KEY: process.env.TOKEN_PRIVATE_KEY,
    SESSION_LIFETIME: parseInt(process.env.SESSION_LIFETIME),
    REFRESH_TOKEN_LIFETIME: parseInt(process.env.REFRESH_TOKEN_LIFETIME),
    ENVIRONMENT: process.env.NODE_ENV,
  };
});
