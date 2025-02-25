import 'reflect-metadata';

import { corsMiddleware } from '@middleware/cors';
import { errorHandler } from '@middleware/errorHandler';
import { enforceJsonResponse } from '@middleware/jsonResponse';
import { loggerMiddleware } from '@middleware/loggerMiddleware';
import { notFoundHandler } from '@middleware/notFound';
import routes from '@routes/index';
import { Logger } from '@utils/logger';
import config from 'config';
import express from 'express';

const logger = Logger.createLoggerInstance(
  config.get('logger'),
  config.get('appName'),
  config.get('version')
);

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(enforceJsonResponse);
app.use(loggerMiddleware(logger));

app.use('/api', routes);

app.use(notFoundHandler);

app.use(errorHandler(logger));

export default app;
