import pino from 'pino';
import { v4 as uuidV4 } from 'uuid';

const pinoLogger = pino({
  enabled: true,
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  messageKey: 'message',
});

export function createLogger(
  params: {
    method?: string;
    url?: string;
  } = {}
) {
  const childLogger = pinoLogger.child({
    'x-request-id': uuidV4(),
    ...(params.method && {
      'x-method': params.method,
    }),
    ...(params.url && {
      'x-url': params.url,
    }),
  });

  return {
    error(obj: unknown, msg?: string) {
      childLogger.error(obj, msg);
    },

    info(obj: unknown, msg?: string) {
      childLogger.info(obj, msg);
    },

    warn(obj: unknown, msg?: string) {
      childLogger.warn(obj, msg);
    },
  };
}
