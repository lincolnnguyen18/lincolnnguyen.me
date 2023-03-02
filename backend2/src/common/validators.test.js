import { validatePutUser, validateUpdateUser } from './validators.js';

describe('validators', () => {
  it('putUser', () => {
    const user = {
      username: '',
      password: '',
      confirmPassword: 'Ln2121809',
    };
    const errors = validatePutUser(user);
    console.log('errors', errors);
  });

  it('updateUser', () => {
    const user = {
      username: '!',
      password: '',
      playbackSpeed: 10,
    };
    const errors = validateUpdateUser(user);
    console.log('errors', errors);
  });
});
