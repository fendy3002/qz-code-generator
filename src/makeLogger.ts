import * as winston from 'winston';

export const makeLogger = (props?: { logInfo?: string }) => {
  const logger = winston.createLogger({
    level: props?.logInfo ?? 'info',
    format: winston.format.combine(
      winston.format.json({
        space: 2,
      }),
    ),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.Console({}),
    ],
  });
  return logger;
};
