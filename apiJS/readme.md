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

### Installation des dépendances

```bash
$npm install express --save
    and
$npm i -D nodemon
```

### Création d'un script de démarrage

```
"scripts": {
    "dev": "nodemon ./src/app.js"
  },
```

### Création du serveur

```javascript
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

### Ajout d'une route utilisateur

```javascript
const express = require('express');
const port = process.env.PORT || 5000;
const route = require('../src/routes/user');
app = express();

// Simple route
app.use('/api/v1/', route);

// Start server
app.listen(port, () => console.log(`Server listen on port ${port}`));
```

### Création d'une route

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

### Installation des dépendances pour la formation

```bash
$npm i express colors cors dotenv mongoose swagger-jsdoc swagger-ui-express
$npm i -D nodemon
```

### Connection à la base de donnée

```javascript
mongo_uri = `mongodb+srv://${host}:${password}@mongocluster-h3gqv.mongodb.net/${bdd}?retryWrites=true&w=majority`;
```

### Création d'un model d'utilisateur

```javascript
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
    ]
  },
  role: {
    type: String
  },
  password: {
    type: String,
    required: [true, 'Please add a password']
  }
});

const User = (module.exports = mongoose.model('User', UserSchema));
```

### Création du controller

```javascript
/**
 * @route       GET /api/v1/users
 * @access      Public
 * @returns     json message
 * @description Get all users from database.
 */
exports.getUsers = async (req, res, next) => {
  try {
    const users = await UserModel.find(req.query);
    res.status(200).json({
      success: true,
      msg: 'Show all users',
      count: users.length,
      data: users
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route       POST /api/v1/users/register
 * @access      Private
 * @returns     json message
 * @description Register a user into database.
 */
exports.registerUser = async (req, res, next) => {
  try {
    const user = await UserModel.create(req.body);

    res.status(201).json({
      success: true,
      data: user,
      //count: user.length,
      msg: 'Created new user'
    });
  } catch (error) {
    console.log(error);
  }
};
```

### Ajout du protocole CORS et Body Parser

```bash
$npm i cors
```

### CORS Options

```bash
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

### Création d'une class Error Response

```javascript
class ErrorResponse extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
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

### Cryptons le mot de passe

```bash
$npm i bcrypt
```

```javascript
/**
 * @function    addUser
 * @returns     json message
 * @description Add a user with crypted password into the database.
 */
const addUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};
```
