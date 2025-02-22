import config from 'config';
import cors from 'cors';

const corsOrigins = config.get<string>('cors.origins');
const credentials = config.get<boolean>('cors.credentials');
const originsArray: string[] | string = corsOrigins === '*' ? '*' : corsOrigins.split(' ');

export const corsMiddleware = cors({
  origin: originsArray,
  credentials,
});
