import express from 'express';
import path from 'path';
import Server from './config/server';
import userRouter from './routes/user_route';
import Atlas from './config/database';
import corsRouter from './middleware/cors';

/**
 * @desc Run the application
 */
class App {
  private app: express.Application;
  private port: string;
  private host: string;
  private password: string;
  private bdd_name: string;
  private env: string;

  constructor() {
    this.port = process.env.PORT!;
    this.host = process.env.DB_HOST_ATLAS!;
    this.password = process.env.DB_PASSWORD!;
    this.bdd_name = process.env.DB_NAME!;
    this.env = process.env.NODE_ENV!;
    this.app = express();
    this.main();
  }

  /**
   * Run all main's app methods
   */
  public main(): void {
    // Start the server
    const server: Server = new Server(this.port, this.app);
    server.runServer();

    // Connection to the bdd
    const database: Atlas = new Atlas(this.host, this.password, this.bdd_name);
    database.connection();

    // Support parsing of application/json type post data
    this.app.use(express.json());
    
    // Enable CORS
		this.app.use('/api/v1/', corsRouter);

    // Main routes
    this.app.use('/api/v1/', userRouter);
    
  }
}

new App();
