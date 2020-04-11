import { Request, Response, NextFunction } from 'express';
import UserModel, { IUser } from '../models/user_model';

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
      msg: 'Show all users',
      count: users.length,
      data: users,
    });
  }
}
