import fs from 'fs';
import { JWT } from 'google-auth-library';
import dotenv from 'dotenv';
dotenv.config();

const secret = fs.readFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const secretObject = JSON.parse(secret);
const clientEmail = secretObject.client_email;
const privateKey = secretObject.private_key;

const googleAuthClient = new JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/cloud-platform'],
});

export { googleAuthClient };
