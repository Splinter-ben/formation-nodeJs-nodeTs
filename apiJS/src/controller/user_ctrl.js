const UserModel = require('../models/user_model'),
  bcrypt = require('bcryptjs'),
  ErrorResponse = require('../utils/ErrorResponse');

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
 * @route       GET /api/v1/users/:id
 * @access      Public
 * @returns     json message
 * @description Get a single user from database.
 */
exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${id}`, 404));
    }
    res
      .status(200)
      .json({ success: true, msg: 'Show a single user', data: user });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route       POST /api/v1/user/register
 * @access      Private
 * @returns     json message
 * @description Register user into database.
 */
exports.registerUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = new UserModel(req.body);

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) {
          throw res.status(500).json({
            success: false,
            data: user,
            msg: 'Failed to register new user !'
          });
        } else {
          user.password = hash;
          user.save(user);
          res.status(200).json({
            success: true,
            data: user,
            msg: `Registration new user: ${name}`
          });
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route       PUT /api/v1/users/:id
 * @access      Private
 * @returns     json message
 * @description Update a user into database.
 */
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      msg: 'User updated',
      count: user.length,
      data: user
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * @route       DELETE /api/v1/users/:id
 * @access      Private
 * @returns     json message
 * @description Delete a user from database.
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndDelete(id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${id}`, 404));
    }
    res.status(200).json({
      success: true,
      msg: 'user deleted',
      count: user.length,
      data: user
    });
  } catch (error) {
    console.log(error);
  }
};
