import { getIdFromSessionToken, getSessionTokenFromId } from './sharedUtils.js';

describe('sharedUtils', () => {
  it('getIdFromSessionToken', () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.OGI4MDVjN2YtMGVlNC00ZThmLThlNTgtMDM3ZmE5ZDM5YTNh.SWJpvcl7-iB2722cD6rzjBGSdQ6ydvpZ9U2IqO1VbUM';
    const id = getIdFromSessionToken(token);
    console.log('id', id);
  });

  it('getSessionTokenFromId', () => {
    const id = '6c8e2bc0-7ef2-4c7a-9670-0c6ca1f7e7f4';
    const token = getSessionTokenFromId(id);
    console.log('token', token);
  });
});
