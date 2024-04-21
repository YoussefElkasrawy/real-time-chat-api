import { Controller, Validate } from '@/decorator';
import Joi from 'joi';

const loginSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

const signupSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
});

const updatePasswordSchema = Joi.object({
  oldPassword: Joi.string().trim().required(),
  newPassword: Joi.string().trim().min(8).required(),
  confNewPassword: Joi.string().trim().min(8).required(),
});

@Controller()
class AuthController {
  @Validate(loginSchema)
  public async login(_: Request, __: Response) {
    /*
    const { phoneNumber } = req.body;
    const result = await UserModel.findOne({ phoneNumber });
    if (result) return res.JSON(HttpStatus.Ok, { user: 'Existing', otp });
    res.JSON(HttpStatus.Ok, { user: 'Not Existing', otp });
    */
  }

  @Validate(signupSchema)
  public async signup(_: Request, __: Response) {
    /*
    const { phoneNumber } = req.body;
    const result = await UserModel.findOne({ phoneNumber });
    if (result) return res.JSON(HttpStatus.Ok, { user: 'Existing', otp });
    res.JSON(HttpStatus.Ok, { user: 'Not Existing', otp });
    */
  }

  @Validate(updatePasswordSchema)
  public async updatePassword(_: Request, __: Response) {
    /*
    const { phoneNumber } = req.body;
    const result = await UserModel.findOne({ phoneNumber });
    if (result) return res.JSON(HttpStatus.Ok, { user: 'Existing', otp });
    res.JSON(HttpStatus.Ok, { user: 'Not Existing', otp });
    */
  }
}

export default new AuthController();
