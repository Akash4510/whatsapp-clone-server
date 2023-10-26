import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';

import router from './routes';
import { logger } from './utils/logger';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(
  rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
  })
);

app.use(router);

const port = process.env.PORT || 8080;

app.listen(port, async () => {
  logger.info(`Server running on http://localhost:${port}`);
});