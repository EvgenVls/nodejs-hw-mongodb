import { Router } from 'express';

import {
  registerUserController,
  loginUserController,
  refreshSessionController,
} from '../controllers/auth.js';

import validateBody from '../utils/validateBody.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { createUserSchema, loginUserSchema } from '../validation/auth.js';

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

userRouter.post('/refresh', ctrlWrapper(refreshSessionController));

export default userRouter;
