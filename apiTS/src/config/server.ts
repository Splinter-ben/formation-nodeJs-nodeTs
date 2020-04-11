import express from "express";
import colors from "colors";

/**
 * @desc   Run the server
 * @params port & app
 */
export default class Server {
  private app: express.Application;
  private port: string;

  constructor(port: string, app: express.Application) {
    this.port = port;
    this.app = app;
  }

  /**
   * Run the server
   */
  public async runServer() {
    try {
      this.app.listen(this.port, () =>
        console.log(
          colors.yellow.inverse(`Server listen on port: ${this.port}`)
        )
      );
    } catch (error) {
      console.log(error, "Server not running !");
    }
  }

  /**
   * Close the server
   */
  public async close() {
    () => process.exit(1);
  }
}
