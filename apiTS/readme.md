# Formation NodeJs avec Typescript

## Objectif de la formation:

- Comprendre une api RESTFULL
- Réaliser un CRUD (Create, Read, Update, Delete)

Prérequis:

- Nodejs + NPM
- Base de javascript ES6 & Typescript

### Création d'un package.json

```bash
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
    "dev": "nodemon ./src/app.ts",
    "build": "tsc -p ."
  },
```

### Création d'un linter

```javascript
{
  "root": true,
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module",
    "parser": "babel-eslint"
  },
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["eslint:recommended"]
}
```

### Création du serveur

```javascript
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
```

### Création de l'application

```javascript
import dotenv from 'dotenv'
import express from 'express'
import path from 'path'
import Server from './config/server'

dotenv.config({ path: path.join(__dirname, '../.env') });

/**
 * @desc Run the application
 */
class App{
    private app: express.Application;
    private port: string;
    private env: string;

    constructor() {
        this.port = process.env.PORT!;
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
    }
}

new App();
```

### Création d'un model 'utilisateur avec cryptage de mot de passe

```javascript
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export const UserSchema: Schema = new Schema({
  name: {
    type: String,
    require: [true, 'Please add an username'],
  },
  email: {
    type: String,
    require: [true, 'Please add a valide email'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// Encrypt password using bcrypt
UserSchema.pre <
  IUser >
  ('save',
  async function (next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  });

const UserModel = mongoose.model < IUser > ('User', UserSchema);
export default UserModel;
```

### Ajout d'un controlleur

```javascript
import { Request, Response, NextFunction } from "express";
import UserModel, { IUser } from "../models/user_model";

/**
 * User controller:
 * Interact with several user's class methods
 */
export default class User {
  public name?: string;
  public email?: string;
  public password?: string;
  public createdAt?: Date;
  constructor(
    name?: string,
    email?: string,
    password?: string,
    createdAt?: Date
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
  }

  /**
   * @route       POST /api/v1/register
   * @access      Public
   * @returns     json message
   * @description Register a new user into database.
   */
  public async register(req: Request, res: Response) {
    const user = await UserModel.create(req.body);

    return res.status(201).json({
      success: true,
      msg: `Created a new User ${user.name}`,
    });
  }

  /**
   * @route       GET /api/v1/users
   * @access      Public
   * @returns     json message
   * @description Get all users from database.
   */
  public async getAllUsers(req: Request, res: Response) {
    const users = await UserModel.find();

    return res.status(200).json({
      success: true,
      msg: "Show all users",
      count: users.length,
      data: users,
    });
  }
}
```

### Ajout des routes

```javascript
import express from 'express';
import User from '../controller/user_ctrl';

const userRouter = express.Router();
const user = new User();

/**
 * Register new user
 */
userRouter.route('/register').post(user.register);

/**
 * Get all registered users
 */
userRouter.route('/register').get(user.getAllUsers);

export default userRouter;
```

### Main application

```javascript
public main(): void {
    // Start the server
    const server: Server = new Server(this.port, this.app);
    server.runServer();

    // Main routes
    this.app.use('/api/v1/', userRouter);
}
```

### Ajout BodyParser

```javascript
this.app.use(express.json());
```

### Creéation du middleware Cors

```javascript
import express from 'express';
import cors from 'cors';

const corsRouter = express.Router();

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:5000',
  preflightContinue: false,
};

corsRouter.use(cors(options));

export default corsRouter;
```

### Ajout du middleware Cors

```javascript
this.app.use('/api/v1/', corsRouter);
```

### Connection à la BDD à distance

```javascript
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
```

### Ajout de la connection à la BDD

```javascript
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
    this.port = process.env.PORT!;
    this.host = process.env.DB_HOST_ATLAS!;
    this.password = process.env.DB_PASSWORD!;
    this.bdd_name = process.env.DB_NAME!;
    this.env = process.env.NODE_ENV!;
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
```
