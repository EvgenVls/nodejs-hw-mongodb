import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  refreshSessionController,
  logoutUserController,
  requestResetEmailController,
  resetPasswordController,
  getGoogleOAuthUrlController,
} from '../controllers/auth.js';

import validateBody from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  createUserSchema,
  loginUserSchema,
  requestResetPasswordSchema,
  resetPasswordSchema,
} from '../validation/auth.js';

const userRouter = Router();

userRouter.post(
  '/register',
  validateBody(createUserSchema),
  ctrlWrapper(registerUserController),
);

userRouter.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

userRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));

userRouter.post('/refresh', ctrlWrapper(refreshSessionController));

userRouter.post('/logout', ctrlWrapper(logoutUserController));

userRouter.post(
  '/send-reset-email',
  validateBody(requestResetPasswordSchema),
  ctrlWrapper(requestResetEmailController),
);

userRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

export default userRouter;
