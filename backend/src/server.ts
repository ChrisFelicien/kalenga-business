import app from '@/app';
import logger from '@/config/logger';
import connectDatabase from '@/config/db';
import mongoose from 'mongoose';
import { Server } from 'node:http';

const PORT = process.env.PORT;
let httpServer: Server | null = null;

const startServer = async () => {
  try {
    await connectDatabase();

    logger.info(`Mongoose connection initialize successfully`);

    httpServer = app.listen(PORT, () => {
      logger.info(`Server http on line on port ${PORT}`);
    });
  } catch (error) {
    logger.fatal({ error }, 'Something went wrong while starting server');
  }
};

const gracefulShutdown = (signal: string) => {
  logger.warn(
    `Signal ${signal} received. Your server is starting shutting down`,
  );

  if (httpServer) {
    httpServer.close((error) => {
      if (error) {
        logger.error({ error }, 'Error closing HTTP server');
      }
      logger.info('Server stopper');
      closeMongoose();
    });
  } else {
    closeMongoose();
  }
};

const closeMongoose = async () => {
  try {
    await mongoose.connection.close();
    logger.info('Mongo connection has been successfully closed');
    process.exit(0);
  } catch (error) {
    logger.error({ error }, 'Error while closing mongo connection');
    process.exit(1);
  }
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

startServer();
