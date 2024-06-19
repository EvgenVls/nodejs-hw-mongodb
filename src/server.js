import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';

const port = Number(env('PORT', '3000'));

const startServer = () => {
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cors());
  app.use(express.json());

  //тут код для обробки запитів

  app.use((req, res, next) => {
    res.status(404).json({
      status: 404,
      message: 'Route not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default startServer;
