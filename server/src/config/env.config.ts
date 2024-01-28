import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import databaseConfig from './database.config';
export const ENV_FILES = {
  development: '.env.dev',
  prod: '.prod.env',
};

const config = {
  isGlobal: true, // Allow config module everywhere
  envFilePath: ENV_FILES[process.env.NODE_ENV],
  load: [databaseConfig],
  validationSchema: Joi.object({
    NODE_ENV: Joi.string()
      .valid('development', 'debug', 'production')
      .default('development'),
    PORT: Joi.number().required(),
    DATABASE_URL: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    TOKEN_PRIVATE_KEY: Joi.string().required(),
    SESSION_LIFETIME: Joi.number().required(),
    REFRESH_TOKEN_LIFETIME: Joi.number().required(),
  }),
};

export default ConfigModule.forRoot(config);
