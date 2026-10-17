import mongoose from 'mongoose';
import config from '@/config/env.config';
import logger from '@/config/logger';

const connectDatabase = async () => {
  const db = mongoose.connection;

  db.on('connected', () => {
    logger.info('Connected to mongo db');
  });

  db.on('error', (err) => {
    logger.error({ err }, `Impossible to connect to mongo server`);
  });

  db.on('disconnected', () => {
    logger.warn('You are disconnected to your mongo database');
  });

  db.on('reconnected', () => {
    logger.info('You are reconnected to mongo database');
  });

  try {
    await mongoose.connect(config.MONGO_URI);
  } catch (error) {
    logger.fatal(
      { err: error },
      'Something went wrong while trying to connect to mongo db',
    );
    process.exit(1);
  }
};

export default connectDatabase;
