import express from 'express';
import cors from 'cors';

const corsRouter = express.Router();

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:5000',
  preflightContinue: false,
};

corsRouter.use(cors(options));

export default corsRouter;
