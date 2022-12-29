import { getIdFromSessionToken } from './sharedUtils.js';

describe('sharedUtils', () => {
  it('getIdFromSessionToken', () => {
    const token = 'eyJhbGciOiJIUzI1NiJ9.OGI4MDVjN2YtMGVlNC00ZThmLThlNTgtMDM3ZmE5ZDM5YTNh.SWJpvcl7-iB2722cD6rzjBGSdQ6ydvpZ9U2IqO1VbUM';
    const id = getIdFromSessionToken(token);
    console.log('id', id);
  });
});
