import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { User } from '../db/models/users.js';

import { createSession } from './sessions.js';
import { Session } from '../db/models/sessions.js';

export const registerUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await User.create({ ...payload, password: encryptedPassword });
};

export const loginUser = async (payload) => {
  const user = await User.findOne({ email: payload.email });

  if (!user) throw createHttpError(401, 'User not found');

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await createSession(user._id);

  //   await Session.deleteOne({ userId: user._id });

  //   const accessToken = randomBytes(30).toString('base64');
  //   const refreshToken = randomBytes(30).toString('base64');

  //   return await Session.create({
  //     userId: user._id,
  //     accessToken,
  //     refreshToken,
  //     accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
  //     refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  //   });
};
export const refreshSession = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) throw createHttpError(401, 'Session not found');

  const isSessionTokenExpired =
    new Date.now() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired)
    throw createHttpError(401, 'Session token expired');

  await createSession(session.userId);
};
