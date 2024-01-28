import { ConfigType } from '@nestjs/config';
import mainConfig from 'src/config/database.config';

export default {
  useFactory: async (config: ConfigType<typeof mainConfig>) => {
    return {
      uri: config.DATABASE_URL,
    };
  },
  inject: [mainConfig.KEY],
};
