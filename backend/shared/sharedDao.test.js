import { sharedDao } from './sharedDao.js';
import { getMockUserData } from './utils/sharedUtils.js';
import _ from 'lodash';

describe('sharedDao', function () {
  let users;
  beforeAll(async function () {
    users = await sharedDao.getAllUsers();
  });

  it('addUser', async function () {
    const res = await sharedDao.addUser(getMockUserData());
    console.log('res', res);
  });

  it('updateUser', async function () {
    const id = 'a7f795dc-4e90-4946-adba-f5735ff8a07d';
    const res = await sharedDao.updateUser(id, { givenName: 'Thanh' });
    console.log('res', res);
  });

  it('addUsers', async function () {
    for (let i = 0; i < 10; i++) {
      await sharedDao.addUser(getMockUserData());
    }
  });

  it('getIdFromEmail', async function () {
    const email = _.sample(users).email;
    const id = await sharedDao.getIdFromEmail(email);
    console.log('id', id);
  });

  it('getUsers', async function () {
    const users = await sharedDao.getAllUsers();
    console.log('users', users);
  });

  it('getUserById', async function () {
    const id = _.sample(users).id;
    const user = await sharedDao.getUserById(id);
    console.log('user', user);
  });

  it('deleteAllItemsInTable', async function () {
    await sharedDao.deleteAllItemsInTable();
  });

  // it('getUserDataByGoogleJwt', async function () {
  //   const googleToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjAyYTYxZWZkMmE0NGZjMjE1MTQ4ZDRlZmZjMzRkNmE3YjJhYzI2ZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NzIxODQ0NDQsImF1ZCI6IjQ5MzEyNDI3ODc5OC1zcmVtZGVwYXE5NTdzdnFxbGxhb2lpZGxxOHFwNTdvay5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjExMjM1ODU2Njg2NjExOTQ5MjIzNiIsImVtYWlsIjoibGluY29sbm5ndXllbjAwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXpwIjoiNDkzMTI0Mjc4Nzk4LXNyZW1kZXBhcTk1N3N2cXFsbGFvaWlkbHE4cXA1N29rLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwibmFtZSI6IkxpbmNvbG4gTmd1eWVuIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FFZEZUcDQxN21CNFg4aERDS3BaR1Q2aDBTTUVwbDFGX1Vzblc3MC1GMlh2MVE9czk2LWMiLCJnaXZlbl9uYW1lIjoiTGluY29sbiIsImZhbWlseV9uYW1lIjoiTmd1eWVuIiwiaWF0IjoxNjcyMTg0NzQ0LCJleHAiOjE2NzIxODgzNDQsImp0aSI6ImY0NTEzMTM0ZTMyMmFlMmI5NzU3NTgyZTk0NWFmMjFjODhlZmE3NmEifQ.Cd3u9euKDsXvcuh5Ty-JU1XWuzhNJLXPS3Wv5XazMSRf7t-XAtZ92GxgwksJQIAaXEJpXdmxXk7VNIXMXOfFQFPaBTFiebYOAUE6DfM7l33nG-HaRbtNBgxbyKJOkIWD0JErWMEZ7pQTbqhe1lMXwGkXHOttPkroT9hGHoTE9JnTHB-oOGTXXkInnPGwwav2IS9c2uVJEvcphC27srD61lRdpw_xBa9B1ZDsfHnDABgl090XR-DqehGBXTvzrDyxiL8PW4x3eabMtb9YnJqcjSiE2xEHd9gzeROfEbi-SrBPJDVFpL_N9ctQG9YXCQxGm7f2mzYGLnVidRtfM34L7w';
  //   const res = await sharedDao.getUserDataByGoogleJwt(googleToken);
  //   console.log(res);
  // });
  //
  // it('getUserDataBySessionToken', async function () {
  //   const sessionToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpbmNvbG5uZ3V5ZW4wMDBAZ21haWwuY29tIiwiaWF0IjoxNjcyMjAxODM0fQ.GKZ_HZtp-vh5TkotTXzA4BvB-OoCG3DY569LgQOzHkE';
  //   const res = await sharedDao.getUserData(sessionToken);
  //   console.log(res);
  // });
  //
  // it('addConnection', async function () {
  //   const email1 = 'lincolnnguyen2121809@gmail.com';
  //   const email2 = 'lincolnnguyen000@gmail.com';
  //   await sharedDao.addConnection(email1, email2);
  // });
});
