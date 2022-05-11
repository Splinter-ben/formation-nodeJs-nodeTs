import express from "express";
import colors from "colors";
import { Environement } from '../constante/environement';

/**
 * @desc   Run the server
 * @params port & app
 */
export default class Server {
  private readonly app = express();

  /**
   * Run the server
   */
  public async runServer() {
    try {
      this.app.listen(Environement.PORT, () =>
        console.log(
          colors.yellow.inverse(`Server listen on port: ${Environement.PORT}`)
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
