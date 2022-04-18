const userRouter = require('express').Router();
const {
  getUsers,
  getUser,
  registerUser,
  updateUser,
  deleteUser
} = require('../controller/user_ctrl');

/**
 * @swagger
 * /api/v1/users/:
 *   get:
 *     tags:
 *       - Get alls users
 *     name: Find users
 *     summary: Find all users
 *     responses:
 *       '200':
 *         description: All users object
 *         schema:
 *           $ref: '#/'
 *       '400':
 *         description: No user found in database
 */
userRouter.route('/users').get(getUsers);

// Get a single user by Id
userRouter.route('/users/:id').get(getUser);

/**
 * @swagger
 * /api/v1/users/register/:
 *   post:
 *     tags:
 *       - Post a user
 *     name: Create user
 *     summary: Create a new user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           $ref: '#/'
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             role:
 *               type: string
 *             password:
 *               type: string
 *         required:
 *           - name
 *           - email
 *           - role
 *           - password
 *     responses:
 *       '200':
 *         description: User created
 *       '403':
 *         description: User's id already taken
 */
userRouter.route('/users/register').post(registerUser);

// Update a user
userRouter.route('/users/update').put(updateUser);

// Delete a new user
userRouter.route('/users/delete').delete(deleteUser);

module.exports = userRouter;
