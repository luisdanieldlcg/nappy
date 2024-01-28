export default {
  pinoHttp: {
    transport: {
      target: 'pino-pretty',
    },
    autoLogging: false,
    serializers: {
      req: () => undefined,
      res: () => undefined,
    },
  },
};
