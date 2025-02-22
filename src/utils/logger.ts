import ILogger, { ILoggerConfig } from '@interfaces/logger';
import maskDeep from 'mask-deep';
import winston from 'winston';

class Logger implements ILogger {
  private logger: winston.Logger;

  private maskConfig = {
    fields: ['authorization', 'Authorization', 'password', 'token'],
    options: { percentage: 80 },
  };

  constructor(config: ILoggerConfig, appName: string, version: string) {
    const logFormat = winston.format.printf(({ level, message, timestamp, ...meta }) => {
      return JSON.stringify({
        timestamp,
        severity: level.toUpperCase(),
        message,
        ...meta,
      });
    });

    this.logger = winston.createLogger({
      level: config.level,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json(), logFormat),
      defaultMeta: { service: appName, version },
      transports: [new winston.transports.Console()],
    });
  }

  private maskMeta<T>(meta?: T): T | undefined {
    return meta
      ? (maskDeep(meta, this.maskConfig.fields, this.maskConfig.options) as T)
      : undefined;
  }

  info<T>(msg: string, meta?: T): void {
    this.logger.info(msg, this.maskMeta(meta));
  }

  warn<T>(msg: string, meta?: T): void {
    this.logger.warn(msg, this.maskMeta(meta));
  }

  error<T>(msg: string, meta?: T): void {
    this.logger.error(msg, this.maskMeta(meta));
  }

  debug<T>(msg: string, meta?: T): void {
    this.logger.debug(msg, this.maskMeta(meta));
  }

  public static createLoggerInstance(
    config: ILoggerConfig,
    appName: string,
    version: string
  ): Logger {
    return new Logger(config, appName, version);
  }
}

export { Logger };
