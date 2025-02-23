import { testDBConnection } from '@infra/database';
import { Logger } from '@utils/logger';
import config from 'config';

import app from './app';

const HOST: string = config.get<string>('listen.host');
const PORT: number = config.get<number>('listen.port');
const APP_NAME: string = config.get<string>('appName');
const APP_VERSION: string = config.get<string>('version');

const logger = Logger.createLoggerInstance(config.get('logger'), APP_NAME, APP_VERSION);

const startServer = async (): Promise<void> => {
  try {
    await testDBConnection();

    const server = app.listen(PORT, HOST, () => {
      logger.info(`🚀 ${APP_NAME} is running on http://${HOST}:${PORT}`);
    });

    // Graceful Shutdown Handling
    const shutdown = async (signal: string): Promise<void> => {
      logger.warn(`${signal} received: closing server`);
      await new Promise((resolve) => server.close(resolve));
      logger.info('Server closed. Exiting process.');
      process.exit(0);
    };

    process.on('SIGTERM', () => void shutdown('SIGTERM'));
    process.on('SIGINT', () => void shutdown('SIGINT'));
  } catch (error) {
    logger.error('❌ Failed to start the server:', error);
    process.exit(1);
  }
};

void startServer();
