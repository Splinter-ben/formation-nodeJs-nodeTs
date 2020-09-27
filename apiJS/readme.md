# Formation NodeJs

## Objectif de la formation:

- Comprendre une api RESTFULL
- Réaliser un CRUD (Create, Read, Update, Delete)

Prérequis:

- Nodejs + NPM
- Base de javascript ES5

### Utiliser le seeder pour insérer ou supprimer la base de donnée

```bash
$node seeder -i
    or
$node seeder -d
```

### Création d'un package.json

```bash
$npm init
    or
$npm init -y
```

### Installation des dépendances pour la formation

```bash
$npm i express colors cors dotenv mongoose swagger-jsdoc swagger-ui-express
$npm i -D nodemon
```

### Création d'un script de démarrage avec inclusion du ficher d'environnement

```
"scripts": {
    "dev": "nodemon -r dotenv/config ./src/app.js"
  },
```

### Création du fichier d'environnement a la racine du projet

```bash
$touch .env
```

### Example de variables
```bash
DB_HOST_ATLAS=example_username
DB_NAME=example_bdd
DB_PASSWORD=example_password
SECRET=example_secret

NODE_ENV=development
PORT=5000
```

### Création du dossier source dans "./src"

```bash
$mkdir src
```

### Création du serveur dans "./src/app.js"

```javascript
require('colors');

const express = require('express');
const port = process.env.PORT || 5000;
app = express();

// Main route
app.get('/', (req, res) => {
  res.send('Hello world');
});

// Start server
app.listen(port, () => console.log(`Server listen on port ${port}`));
```

### Ajout d'une route utilisateur dans "./src/app.js"

```javascript
require('colors');

const express = require('express');
const port = process.env.PORT || 5000;
const route = require('../src/routes/user');
app = express();

// Route
// app.get() becomes app.use()
app.use('/api/v1/', route);

// Start server
app.listen(port, () => console.log(`Server listen on port ${port}`));
```

### Création d'une route "./src/app.js"

```javascript
const route = require('express').Route();

// User
route.get('/user', (req, res) => {
  res.send({
    firstName: 'John',
    lastName: 'Doe',
    age: 37,
    city: 'Lyon'
  });
});

module.exports = route;
```

### Création de la connection à la base de donnée dans "./src/database/database.js"

```javascript
const mongoose = require('mongoose'),
  host = process.env.DB_HOST_ATLAS,
  password = process.env.DB_PASSWORD,
  bdd = process.env.DB_NAME;

// Atlas mongoDB
const URL = `mongodb+srv://${host}:${password}@mongocluster-h3gqv.mongodb.net/${bdd}?retryWrites=true&w=majority`;

const connectDB = async () => {
  const conn = await mongoose.connect((mongo_uri = URL), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
```
### Ajout d'une connection à la base de donée dans "./src/app.js"

```javascript
require('colors');

const express = require('express');
const port = process.env.PORT || 5000;
const route = require('../src/routes/user');
const connectDB = require('./database/database');
app = express();

// Route
// app.get() becomes app.use()
app.use('/api/v1/', route);

// Connection BDD
connectDB();

// Start server
app.listen(port, () => console.log(`Server listen on port ${port}`));
```

### Création d'un model d'utilisateur dans "./src/model/user.model.js"

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['member', 'guest'],
    default: 'guest',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
});

module.exports = mongoose.model('User', UserSchema);
```

### Création du controller dans "./src/controller/user.controller.js"

```javascript
const User = require('../models/user.model');

/**
 * @route       GET /api/v1/user
 * @access      Public
 * @returns     json message
 * @description Get all users from database.
 */
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(req.query);

    res.status(200).json({
      success: true,
      msg: 'Show all users',
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route       POST /api/v1/user/register
 * @access      Private
 * @returns     json message
 * @description Register a user into database.
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.create(req.body);

    res.status(200).json({
      success: true,
      data: user,
      msg: `Registration new user: ${name}`,
    });
  } catch (error) {
    console.log(error);
  }
};
```

### Modification des routes dans "./src/route/user.route.js"

```javascript
const userRouter = require('express').Router();
const { getUsers, registerUser } = require('../controller/user.controller');

// GET all Users
userRouter.route('/user').get(getUsers);

// POST a new user
userRouter.route('/user/register').post(registerUser);

module.exports = userRouter;
```

### Ajout de Body Parser dans "./src/app.js"

```javascript
require('colors');

const express = require('express'),
  port = process.env.PORT,
  userRouter = require('../route/user.route'),
  connectDB = require('../database/atlas'),
  app = express();

// Body Parser parsing of application/json type post data
app.use(express.json());

// Main route
app.use('/api/v1', userRouter);

// Connection BDD
connectDB();

// Start server
app.listen(port, () => console.log(`Server listen on port: ${port}`));
```

### Ajout de Cors dans "./src/app.js"
```Javascript
require('colors');

const express = require('express'),
  port = process.env.PORT,
  userRouter = require('../route/user.route'),
  cors = require('cors'),
  connectDB = require('../database/atlas'),
  app = express();

// Cors
app.use(cors());

// Body Parser parsing of application/json type post data
app.use(express.json());

// Main route
app.use('/api/v1', userRouter);

// Connection BDD
connectDB();

// Start server
app.listen(port, () => console.log(`Server listen on port: ${port}`));
```

### Création du CORS Options dans "./src/midlleware/cors.js"

```javascript
const whitelist = [
  'http://localhost:5000',
  'http://localhost:4200'
  ];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
```

```javascript
// Enable CORS
app.use(cors(corsOptions));

// Support parsing of application/json type post data
app.use(express.json());
```

### Ajout de la protection CORS sur les routes dans "./src/route/user.route.js"

```javascript
const { getUsers, registerUser } = require('../controller/user.controller'),
  userRouter = require('express').Router(),
  corsOptions = require('../middlewares/cors'),
  cors = require('cors');

// GET all users
userRouter.route('/user', cors(corsOptions)).get(getUsers);

// POST a new user
userRouter.route('/user/register', cors(corsOptions)).post(registerUser);

module.exports = userRouter;
```

```javascript
// Enable CORS
app.use(cors(corsOptions));

// Support parsing of application/json type post data
app.use(express.json());
```

### Création d'une class Error Response dans "./src/errors/error.response.js"

```javascript
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
```

### Ajout du GET single user dans "./src/controller/user.controller.js"

```javascript
const User = require('../models/user.model'),
  ErrorResponse = require('../errors/error.response');
  
/**
 * @route       GET /api/v1/user/:{id}
 * @access      Public
 * @returns     json message
 * @description Get a single user from database.
 */
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      // Yes, it's a valid ObjectId, proceed with `findById` call.
      const user = await User.findById(id);

      res.status(200).json({
        success: true,
        data: user,
      });
    } else {
      return next(new ErrorResponse(`No user with the id of ${id}`), 404);
    }
  } catch (error) {
    console.log(error);
  }
};
```

### Ajout du GET single user dans "./src/route/user.route.js"

```javascript
// GET a single user
userRouter.route('/user/:id', cors(corsOptions)).get(getUser);
```

### Cryptons le mot de passe depuis le model "./src/model/user.model.js"

```bash
$npm i bcryptjs
```

```javascript
const mongoose = require('mongoose'),
  bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
  },
  role: {
    type: String,
    enum: ['member', 'guest'],
    default: 'guest',
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = mongoose.model('User', UserSchema);
```

### Ajout d'un logger avec morgan

```bash
$npm i morgan
```

```javascript
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
```

### Ajout de swagger

```bash
$npm i swagger-jsdoc swagger-ui-express
```

```javascript
// Swagger doc route
(swaggerUi = require('swagger-ui-express')),
  (swaggerDocs = require('./swagger/swagger')),
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
```

```javascript
const swaggerJsDoc = require('swagger-jsdoc');

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'User Profile API',
      desc: 'A NodeJs profile user api',
      contact: {
        name: 'Benjamin Champetier',
        github: 'https://github.com/Splinter-ben/formation-nodejs',
        project: 'Formation Nodejs'
      },
      servers: ['http://localhost:5000']
    }
  },
  apis: ['app.js', './routes/*.js']
};
module.exports = swaggerDocs = swaggerJsDoc(swaggerOptions);
```

### Ajout de swagger sur notre route GET

```javascript
/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     tags:
 *       - Get alls users
 *     name: Find users
 *     summary: Finds all users
 *     responses:
 *       '200':
 *         description: All users object
 *         schema:
 *           $ref: '#/'
 *       '400':
 *         description: No user found in db
 */
userRouter.route('/users').get(getUsers);
```
