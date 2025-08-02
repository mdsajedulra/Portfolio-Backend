import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authValidation } from './auth.validation';
import { userValidation } from '../user/user.validation';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';

const authrouter = Router();

authrouter.post(
  '/register',
  validateRequest(userValidation.UserSchema),
  authController.register,
);

authrouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.login,
);

authrouter.post(
  '/change-password',
  auth('user'),
  validateRequest(authValidation.changePasswordValidationSchema),
  authController.changePassword,
);

export default authrouter;