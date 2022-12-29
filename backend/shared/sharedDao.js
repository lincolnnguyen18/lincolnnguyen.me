import dynamoose from 'dynamoose';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

const tableSchema = new dynamoose.Schema({
  pk: { type: String, hashKey: true },
  sk: { type: String, rangeKey: true },
  createdAt: String,
  updatedAt: String,

  // user info
  id: String,
  picture: String,
  email: String,
  familyName: String,
  givenName: String,

  pk2: {
    type: String,
    index: {
      global: true,
      name: 'usersIndex',
      project: ['id', 'picture', 'email', 'familyName', 'givenName', 'createdAt', 'updatedAt'],
      rangeKey: 'pk',
    },
  },

  pk3: {
    type: String,
    index: {
      global: true,
      name: 'emailsIndex',
      project: ['id'],
      rangeKey: 'email',
    },
  },
});

class SharedDao {
  constructor (tableName) {
    this.table = dynamoose.model(tableName, tableSchema, { throughput: 'ON_DEMAND' });
  }

  // async getSessionToken (googleToken) {
  //   try {
  //     const ticket = await googleAuthClient.verifyIdToken({
  //       idToken: googleToken,
  //       audience: process.env.GOOGLE_CLIENT_ID,
  //     });
  //     const payload = ticket.getPayload();
  //     const payloadData = {
  //       picture: payload.picture,
  //       email: payload.email,
  //       familyName: payload.family_name,
  //       givenName: payload.given_name,
  //       lastLogin: Date.now().toString(),
  //     };
  //     await this.table.create({
  //       pk: `user#${payloadData.email}`,
  //       sk: 'userData',
  //       userData: JSON.stringify(payloadData),
  //     }, {
  //       overwrite: true,
  //     });
  //
  //     const sessionToken = jwt.sign({ email: payloadData.email }, process.env.JWT_SECRET);
  //     return sessionToken;
  //   } catch (error) {
  //     console.error(error);
  //     return null;
  //   }
  // }
  //
  // async getUserData (sessionToken) {
  //   try {
  //     const { email } = jwt.verify(sessionToken, process.env.JWT_SECRET);
  //     const userData = await this.table.get({
  //       pk: `user#${email}`,
  //       sk: 'userData',
  //     });
  //     return JSON.parse(userData.userData);
  //   } catch (error) {
  //     // console.error(error);
  //     return null;
  //   }
  // }

  async getUserById (userId) {
    const res = await this.table
      .query('pk').eq(`user#${userId}`)
      .where('sk').eq('info')
      .exec();
    return res[0];
  }

  async getIdFromEmail (email) {
    const res = await this.table
      .query('pk3').eq('emails')
      .where('email').eq(email)
      .exec();
    if (res.length === 0) {
      return null;
    } else {
      return res[0].id;
    }
  }

  async addUser ({ id, picture, email, familyName, givenName, createdAt }) {
    return await this.table.create({
      pk: `user#${id}`,
      sk: 'info',
      id,
      picture,
      email,
      familyName,
      givenName,
      createdAt,
      updatedAt: createdAt,

      pk2: 'users',
      pk3: 'emails',
    }, { overwrite: false });
  }

  async updateUser (id, updateObj) {
    return await this.table.update(
      { pk: `user#${id}`, sk: 'info' },
      updateObj,
      { condition: new dynamoose.Condition().where('pk').exists() },
    );
  }

  async getAllUsers () {
    return await this.table.query('pk2').eq('users').where('pk').beginsWith('user#').using('usersIndex').exec();
  }

  async deleteAllItemsInTable () {
    await this.table.scan().exec().then(async (items) => {
      for (const item of items) {
        await this.table.delete(item);
      }
    });
  }
}

const sharedDao = new SharedDao(process.env.SHARED_TABLE_NAME);

export { SharedDao, sharedDao };
