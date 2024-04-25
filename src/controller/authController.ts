import UserModel from '@/database/models/user';
import { ApiError, HttpStatus } from '@/error';
import {
  validateLoginDetails,
  validateSignupDetails,
  validateUpdatePasswordDetails,
} from '@/utils/validation/authValidation';
import { Response, Request, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import { createToken } from '@/utils/token';
import Config from '@/config';
import { wrapResponse } from '@/utils/response';

interface CustomRequest extends Request {
  userId?: string;
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const validation = validateLoginDetails(username, password).error;
    if (validation) {
      throw new ApiError(validation.message, HttpStatus.BadRequest);
    }

    const user = await UserModel.findOne({ username });
    if (!user) throw ApiError.invalidCredentials();

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) throw ApiError.invalidCredentials();

    const result = {
      username: username,
      accessToken: createToken({ id: user._id }, Config.ACCESS_TOKEN_KEY, Config.ACCESS_TOKEN_EXP),
    };
    res.JSON(HttpStatus.Ok, wrapResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function signup(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;

    const validation = validateSignupDetails(username, password).error;
    if (validation) {
      throw new ApiError(validation.message, HttpStatus.BadRequest);
    }

    // Ensure password does not contain username as a substring
    if (password.includes(username))
      throw new ApiError('Password should not contain username', HttpStatus.BadRequest);

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) throw ApiError.duplicate('Username');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    const result = {
      username: newUser.username,
      accessToken: createToken(
        { id: newUser._id },
        Config.ACCESS_TOKEN_KEY,
        Config.ACCESS_TOKEN_EXP,
      ),
    };
    res.JSON(HttpStatus.Ok, wrapResponse(result));
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const { oldPassword, newPassword, confNewPassword } = req.body;

    const validation = validateUpdatePasswordDetails(
      oldPassword,
      newPassword,
      confNewPassword,
    ).error;
    if (validation) {
      throw new ApiError(validation.message, HttpStatus.BadRequest);
    }

    const user = await UserModel.findById(req.userId);
    if (!user) throw ApiError.invalidToken();

    const isOldPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordCorrect)
      throw new ApiError('Old password is incorrect.', HttpStatus.BadRequest);

    const reuseChecks = await Promise.all(
      user.oldPasswords.map(async oldHashedPassword => {
        return await bcrypt.compare(newPassword, oldHashedPassword);
      }),
    );
    const isPasswordReused = reuseChecks.some(result => result === true);
    if (isPasswordReused)
      throw new ApiError('Cannot reuse previous passwords.', HttpStatus.BadRequest);

    user.oldPasswords.push(user.password);

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();

    const result = 'Password updated successfully';
    res.JSON(HttpStatus.Ok, wrapResponse(result));
  } catch (error) {
    next(error);
  }
}
