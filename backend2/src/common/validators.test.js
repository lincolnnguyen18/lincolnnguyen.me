import { validatePutUser } from './validators.js';

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
});
