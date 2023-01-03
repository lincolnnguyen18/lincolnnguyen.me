import { faker } from '@faker-js/faker';
import jwt from 'jsonwebtoken';
import { googleAuthClient } from './sharedClients.js';
import crypto from 'crypto';

function uuid () {
  return crypto.randomUUID();
}

function getMockUserData () {
  return {
    id: uuid(),
    picture: faker.image.avatar(),
    email: faker.internet.email(),
    familyName: faker.name.lastName(),
    givenName: faker.name.firstName(),
    createdAt: faker.date.recent().getTime(),
  };
}

async function decodeGoogleToken (googleToken) {
  const ticket = await googleAuthClient.verifyIdToken({
    idToken: googleToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  return ticket.getPayload();
}

function getSessionTokenFromId (id) {
  return jwt.sign(id, process.env.JWT_SECRET);
}

function getIdFromSessionToken (sessionToken) {
  try {
    return jwt.verify(sessionToken, process.env.JWT_SECRET);
  } catch (err) {
    // console.error(err);
    return null;
  }
}

export {
  uuid,
  getMockUserData,
  decodeGoogleToken,
  getSessionTokenFromId,
  getIdFromSessionToken,
};
