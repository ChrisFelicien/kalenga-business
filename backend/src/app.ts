import express, { Express, NextFunction, Request, Response } from 'express';
import { httpLogger } from '@/middlewares/httpLogger';
import globalErrorHandler from '@/middlewares/errorHandler';
import AppError from './utils/AppError';

const app: Express = express();

app.use(express.json());

app.use(httpLogger);

app.get('/health', (req, res) => {
  req.log.info({ service: 'health-check' }, 'Health check hit');
  res.status(200).json({ status: 'UP' });
});

app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  next(
    new AppError(`This ${req.originalUrl} is not defined on this server`, 404),
  );
});

app.use(globalErrorHandler);

export default app;
