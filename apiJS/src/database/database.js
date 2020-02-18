const mongoose = require('mongoose'),
  host = process.env.DB_HOST_ATLAS,
  password = process.env.DB_PASSWORD,
  bdd = process.env.DB_NAME;

const cloud_Url = `mongodb+srv://${host}:${password}@mongocluster-h3gqv.mongodb.net/${bdd}?retryWrites=true&w=majority`;
const local_Url = 'mongodb://localhost:27017/meanauth';

// Atlas mongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect((mongo_uri = cloud_Url), {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
