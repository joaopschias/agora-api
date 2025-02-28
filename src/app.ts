import 'reflect-metadata';

import { corsMiddleware } from '@middleware/cors-middleware';
import { errorHandler } from '@middleware/error-handler';
import { enforceJsonResponse } from '@middleware/json-response';
import { loggerMiddleware } from '@middleware/logger-middleware';
import { notFoundHandler } from '@middleware/not-found-handler';
import routes from '@routes/index';
import { Logger } from '@utils/Logger';
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
