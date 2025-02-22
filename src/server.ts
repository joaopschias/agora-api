/* eslint-disable no-console */
import config from 'config';

import app from './app';

// ✅ Explicitly define types for config values
const HOST: string = config.get<string>('listen.host');
const PORT: number = config.get<number>('listen.port');
const APP_NAME: string = config.get<string>('appName');

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 ${APP_NAME} is running on http://${HOST}:${PORT}`);
});

// Graceful Shutdown Handling
const shutdown = async (signal: string): Promise<void> => {
  console.log(`${signal} received: closing server`);
  await new Promise((resolve) => server.close(resolve));
  console.log('Server closed. Exiting process.');
  process.exit(0);
};

process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
