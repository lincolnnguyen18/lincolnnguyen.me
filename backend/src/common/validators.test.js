import { validatePutUser, validateUpdateUser } from './validators.js';

describe('validators', () => {
  it('putUser', () => {
    const user = {
      username: '',
      password: '',
      confirmPassword: '',
    };
    const errors = validatePutUser(user);
    console.log('errors', errors);
  });

  it('updateUser', () => {
    const user = {
      username: '!',
      password: '',
      playbackSpeed: 10,
      transcribeCutOffType: 'word',
    };
    const errors = validateUpdateUser(user);
    console.log('errors', errors);
  });
});
