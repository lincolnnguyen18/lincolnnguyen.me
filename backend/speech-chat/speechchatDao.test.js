import _ from 'lodash';
import { faker } from '@faker-js/faker';
import { speechchatDao } from './speechchatDao.js';
import { sharedDao } from '../shared/sharedDao.js';

describe('speechchatDao', function () {
  let users;
  beforeAll(async function () {
    users = await sharedDao.getAllUsers();
  });

  it('addConnection', async function () {
    const promises = [];
    for (let i = 0; i < users.length; i++) {
      const initiatorUserId = _.sample(users).id;
      const receiverUserId = _.sample(users).id;
      const timestamp = faker.date.recent().getTime();
      promises.push(
        speechchatDao.addConnection({
          initiatorUserId,
          receiverUserId,
          timestamp,
        }),
      );
    }
    try {
      await Promise.all(promises);
    } catch (e) {
      console.error(e);
    }
  });

  it('getContacts', async function () {
    const userId = _.sample(users).id;
    // const userId = 'd256fe97-626e-4971-9fe3-51cd9df60910';
    console.log('userId', userId);
    const res = await speechchatDao.getContacts(userId, {
      limit: 999,
      lastKey: null,
    });
    console.log('res', res);
  });

  it('getContacts with lastKey', async function () {
    const userId = '67219799-d26a-4fd8-a705-ec48b032ff3d';
    const res = await speechchatDao.getContacts(userId, {
      limit: 1,
      lastKey: null,
    });
    console.log('res', res);

    // for each messages, fetch messages info
    const contactIds = res.contacts.map((contact) => contact.contactId);
    const contactInfos = await Promise.all(contactIds.map((contactId) => sharedDao.getUserById(contactId)));
    console.log('contactInfos', contactInfos);
    return res;
  });

  it('addMessage', async function () {
    // const senderUserId = _.sample(users).id;
    // console.log('senderUserId', senderUserId);
    // const receiverUserId = _.sample(users).id;
    // console.log('receiverUserId', receiverUserId);

    const senderUserId = 'b08de5bb-a494-4403-9c19-b3ee2586c49e';
    const receiverUserId = 'ccfc7113-6156-47f5-8225-9b384377cb82';

    const createdAt = faker.date.recent().getTime();
    const text = faker.lorem.sentence();
    try {
      await speechchatDao.addMessage({
        senderUserId,
        receiverUserId,
        type: 'text',
        text,
        createdAt,
      });
    } catch (e) {
      console.error(e);
    }
  });

  it('getMessages', async function () {
    const senderUserId = 'b08de5bb-a494-4403-9c19-b3ee2586c49e';
    const receiverUserId = 'ccfc7113-6156-47f5-8225-9b384377cb82';
    const res = await speechchatDao.getMessages(senderUserId, receiverUserId, {
      limit: 999,
      lastKey: null,
    });
    console.log('res', res);
  });
});
