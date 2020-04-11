import colors from 'colors';
import mongoose from 'mongoose';

/**
 * Atlas:
 * Connect to mongodb cloud database
 */
export default class Atlas {
  public host: string;
  public password: string;
  public bdd_name: string;

  constructor(host: string, password: string, bdd: string) {
    this.host = host;
    this.password = password;
    this.bdd_name = bdd;
  }

  /**
   * Connect to the database
   */
  public async connection() {
    try {
      const conn = await mongoose.connect(
        `mongodb+srv://${this.host}:${this.password}@mongocluster-h3gqv.mongodb.net/${this.bdd_name}?retryWrites=true&w=majority`,
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
