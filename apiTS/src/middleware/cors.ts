import express from 'express';
import cors from 'cors';

/**
 * @desc Cors allows external connections
 */
export class Cors {
  public corsRouter = express.Router();
  private options: cors.CorsOptions = {
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

  constructor() {
    this.corsRouter.use(cors(this.options));
  }
}
