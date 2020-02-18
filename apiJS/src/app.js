require('dotenv').config();
require('colors');

const express = require('express'),
  port = process.env.PORT,
  cors = require('cors'),
  path = require('path'),
  fs = require('fs'),
  morgan = require('morgan'),
  connectDB = require('./database/database'),
  userRouter = require('../src/routes/user'),
  swaggerUi = require('swagger-ui-express'),
  swaggerDocs = require('./swagger/swagger'),
  app = express();

// Logger
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'logger/logger.log'),
  { flags: 'a' }
);
// Create a write stream (in append mode)
app.use(morgan('combined', { stream: accessLogStream }));
// Log only error responses
app.use(
  morgan('combined', {
    skip: (req, res) => {
      return res.statusCode < 400;
    }
  })
);

// Swagger doc route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// cors
app.use(cors());
// Body Parser
app.use(express.json());

// Database
connectDB();

// Simple route
app.use('/api/v1/', userRouter);

// Start server
app.listen(port, () => console.log(`Server listen on port ${port}`));
