import app from '@/app';
import logger from '@/config/logger';

const PORT = process.env.PORT;
app.listen(PORT, () => {
  logger.info(
    `🚀 Server running on port ${PORT} [ENV: ${process.env.NODE_ENV || 'development'}]`,
  );
});
