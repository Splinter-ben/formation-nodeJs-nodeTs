require('dotenv').config();
require('colors');

const fs = require('fs'),
  connectDB = require('./src/database/atlas'),
  User = require('./src/models/user_model');

// Database
connectDB();

// Read JSON files
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/user_data.json`, 'utf8')
);

// Import into BDD
const importData = async () => {
  try {
    await User.create(user);
    console.log('data imported into database'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error, 'data failed to be imported'.red.bold);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('data deleted from database'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error, 'data failed to be deleted'.magenta.bold);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
