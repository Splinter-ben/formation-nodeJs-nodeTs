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
UserSchema.pre<IUser>('save', async function (next) {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;
