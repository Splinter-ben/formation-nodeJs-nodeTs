import colors from 'colors';
import mongoose from 'mongoose';
import { Environement } from '../constante/environement';

/**
 * @desc Connect to mongodb cloud database
 */
export default class Atlas {

  /**
   * @desc Connect to the database mongoose v5.8.7
   */
  public async connection() {
    try {
      const conn = await mongoose.connect(Environement.BDD_URI,
        {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        }
      );
      console.log(
        colors.cyan.underline.bold(
          `MongoDB connected to collections: ${Object.keys(
            conn.connection.collections
          )}`
        )
      );
    } catch (error) {
      console.log(error, `Can't connect to the BDD !`);
    }
  }
}
