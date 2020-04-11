import express from 'express'
import User from '../controller/user_ctrl'

const userRouter = express.Router();
const user = new User();

/**
 * Register new user
 */
userRouter.route('/register').post(user.register);

/**
 * Get all registered users
 */
userRouter.route('/users').get(user.getAllUsers);

export default userRouter;