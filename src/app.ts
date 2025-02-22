import { corsMiddleware } from '@middleware/cors';
import { enforceJsonResponse } from '@middleware/jsonResponse';
import { loggerMiddleware } from '@middleware/loggerMiddleware';
import { notFoundHandler } from '@middleware/notFound';
import routes from '@routes/index';
import { Logger } from '@utils/logger';
import config from 'config';
import express from 'express';

const app = express();
const logger = Logger.createLoggerInstance(
  config.get('logger'),
  config.get('appName'),
  config.get('version')
);

app.use(corsMiddleware);
app.use(express.json());
app.use(loggerMiddleware(logger));
app.use(enforceJsonResponse);
app.use('/api', routes);
app.use(notFoundHandler);

export default app;
