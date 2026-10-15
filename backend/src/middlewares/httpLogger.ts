import { pinoHttp } from 'pino-http';
import { randomUUID } from 'crypto';
import { logger } from '../config/logger';

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req, res) => {
    const existingId = req.headers['x-request-id'] as string;
    if (existingId) return existingId;
    const id = randomUUID();
    res.setHeader('X-Request-ID', id);
    return id;
  },
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 500 || err) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  customSuccessMessage: (req, res) => {
    return `HTTP ${req.method} ${req.url} finished with status ${res.statusCode}`;
  },
  customErrorMessage: (req, res, err) => {
    return `HTTP ${req.method} ${req.url} failed with error: ${err.message}`;
  },
});
