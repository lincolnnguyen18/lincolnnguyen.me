import dynamoose from 'dynamoose';
import jwt from 'jsonwebtoken';
import { googleAuthClient } from '../shared/clients.js';

const tableSchema = new dynamoose.Schema({
  pk: { type: String, hashKey: true },
  sk: { type: String, rangeKey: true },
  userData: { type: String },
});

class SharedDao {
  constructor (tableName) {
    this.table = dynamoose.model(tableName, tableSchema, { throughput: 'ON_DEMAND' });
  }

  async getUserDataByGoogleJwt (googleJwt) {
    try {
      const ticket = await googleAuthClient.verifyIdToken({
        idToken: googleJwt,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const payloadData = {
        picture: payload.picture,
        email: payload.email,
        familyName: payload.family_name,
        givenName: payload.given_name,
        lastLogin: Date.now().toString(),
      };
      await this.table.create({
        pk: `USER#${payloadData.email}`,
        sk: 'SHARED#userData',
        userData: JSON.stringify(payloadData),
      }, {
        overwrite: true,
      });

      const sessionToken = jwt.sign({ email: payloadData.email }, process.env.JWT_SECRET);
      return {
        ...payloadData,
        sessionToken,
      };
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async getUserDataBySessionToken (sessionToken) {
    try {
      const { email } = jwt.verify(sessionToken, process.env.JWT_SECRET);
      const userData = await this.table.get({
        pk: `USER#${email}`,
        sk: 'SHARED#userData',
      });
      return JSON.parse(userData.userData);
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

const sharedDao = new SharedDao(process.env.SHARED_TABLE_NAME);

export { SharedDao, sharedDao };
