import { randomBytes } from 'crypto';

import { Session } from '../db/models/sessions.js';

import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';

export const createSession = async (userId) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  await Session.deleteOne({ userId });

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};
