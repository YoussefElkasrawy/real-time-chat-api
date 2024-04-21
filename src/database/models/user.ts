import mongoose, { Schema } from 'mongoose';

export interface UserDB
  extends mongoose.Document,
    mongoose.ResolveTimestamps<{ createdAt: Date; updatedAt: Date }, { timestamps: true }> {
  username: string;
  password: string;
  oldPasswords: string[];
}

const userSchema = new Schema<UserDB>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    oldPasswords: {
      type: [String],
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
