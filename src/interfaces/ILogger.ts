interface ILogger {
  info<T>(msg: string, meta?: T): void;
  error<T>(msg: string, meta?: T): void;
  warn<T>(msg: string, meta?: T): void;
  debug<T>(msg: string, meta?: T): void;
}

export interface ILoggerConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
}

export default ILogger;
