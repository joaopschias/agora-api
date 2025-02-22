import routes from '@routes/index';
import express from 'express';

const app = express();

app.use(express.json());
app.use(enforceJsonResponse);
app.use('/api', routes);

export default app;
