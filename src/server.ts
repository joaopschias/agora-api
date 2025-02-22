/* eslint-disable no-console */
import 'tsconfig-paths/register';

import app from './app';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Graceful Shutdown Handling
const shutdown = async (signal: string): Promise<void> => {
  console.log(`${signal} received: closing server and resources`);
  await new Promise((resolve) => server.close(resolve));
  process.exit(0);
};

// ✅ Corrected `process.on()` usage to avoid ESLint errors
process.on('SIGTERM', () => {
  void shutdown('SIGTERM');
});

process.on('SIGINT', () => {
  void shutdown('SIGINT');
});
