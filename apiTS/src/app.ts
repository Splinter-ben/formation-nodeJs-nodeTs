import express from 'express';
import Server from './config/server';
import userRouter from './routes/user_route';
import Atlas from './config/database';
import { Cors } from './middleware/cors';


/**
 * @desc Run the application
 */
class App {
  private readonly app = express();
  constructor() {

    this.main();
  }

  /**
   * Run all main's app methods
   */
  public main(): void {
    // Start the server
    new Server().runServer();

    // Connection to the bdd
    new Atlas().connection();

    // Support parsing of application/json type post data
    this.app.use(express.json());
    
    // Enable CORS
    const cors = new Cors().corsRouter;
		this.app.use('/api/v1/', cors);

    // Main routes
    this.app.use('/api/v1/', userRouter);
    
  }
}

new App();


