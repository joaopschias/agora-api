import { corsMiddleware } from '@middleware/cors';
import { enforceJsonResponse } from '@middleware/jsonResponse';
import { notFoundHandler } from '@middleware/notFound';
import routes from '@routes/index';
import express from 'express';

const app = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(enforceJsonResponse);
app.use(notFoundHandler);
app.use('/api', routes);

export default app;
