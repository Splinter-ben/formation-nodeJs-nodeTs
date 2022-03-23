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

### Création d'un linter .eslintrc

```javascript
{
  "root": true,
  "parserOptions": {
    "ecmaVersion": 2021,
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

### Création d'un dist folder and src folder

```bash
$mkdir dist
$mkdir src
```

### Création d'un fichier config tsconfig.json

```javascript
{
    "compilerOptions": {
      /* Basic Options */
      // "incremental": true,                   /* Enable incremental compilation */
      "target": "es6" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
      "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
      // "lib": [],                             /* Specify library files to be included in the compilation. */
      // "allowJs": true,                       /* Allow javascript files to be compiled. */
      // "checkJs": true,                       /* Report errors in .js files. */
      // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
      // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
      // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
      // "sourceMap": true,                     /* Generates corresponding '.map' file. */
      // "outFile": "./",                       /* Concatenate and emit output to single file. */
      "outDir": "./dist" /* Redirect output structure to the directory. */,
      "rootDir": "./src" /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */,
      // "composite": true,                     /* Enable project compilation */
      // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
      // "removeComments": true,                /* Do not emit comments to output. */
      // "noEmit": true,                        /* Do not emit outputs. */
      // "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
      // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
      // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */
  
      /* Strict Type-Checking Options */
      "strict": true /* Enable all strict type-checking options. */,
      // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. */
      // "strictNullChecks": true,              /* Enable strict null checks. */
      // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
      // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
      // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
      // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
      // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */
  
      /* Additional Checks */
      // "noUnusedLocals": true,                /* Report errors on unused locals. */
      // "noUnusedParameters": true,            /* Report errors on unused parameters. */
      // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
      // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */
  
      /* Module Resolution Options */
      // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
      // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
      // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
      // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
      // "typeRoots": [],                       /* List of folders to include type definitions from. */
      // "types": [],                           /* Type declaration files to be included in compilation. */
      // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
      "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
      // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
      // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */
  
      /* Source Map Options */
      // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
      // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
      // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
      // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */
  
      /* Experimental Options */
      // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
      // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */
  
      /* Advanced Options */
      "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
    }
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
      this.app.listen(this.port, () => console.log(
                colors.yellow.inverse(`Server listen on port: ${this.port}`)
            ))
    } catch (error) {
        console.log(colors.red('Error: server is not running'));
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
import express from 'express'
import Server from './config/server'

/**
 * @desc Run the application
 */
class App{
    private app: express.Application;
    private port: string;

    constructor() {
        this.port = process.env.PORT!;
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
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from 'bcryptjs';

const { isEmail } = require('validator');
const SALT_WORK_FACTOR = 10;

export enum Roles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Roles;
    createdAt: Date
}

export const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        require: [true, 'Please add an username'],
    },
    email: {
        type: String,
        require: true,
        validate: [isEmail, 'Email is not valid'],
        createIndexes: { unique: true },
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
    },
    role: {
        type: String,
        required: true,
        default: 'USER',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

// Encrypt password
UserSchema.methods.save = async function save() {
    if (!this.isModified('password')) return true;
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);
        this.password;
    } catch (error) {
        return error;
    }
};

// Validate password
UserSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const UserModel = mongoose.model<IUser>('User', UserSchema);
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
   * @route       POST /api/v1/user/register
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
userRouter.route('/user/register').post(user.register);

/**
 * Get all registered users
 */
userRouter.route('/users').get(user.getAllUsers);

export default userRouter;
```

### Main application

```javascript
public main(): void {
    // Start the server
    const server: Server = new Server(this.port, this.app);
    server.runServer();

    // Main routes
    this.app.use('/api/v1', userRouter);
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
