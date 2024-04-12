import { describe, expect, it } from 'vitest';
import authRoute from '../routes/auth.route';
import AuthSpec from './models/auth.spec-model';
import { processSignin, processSignup } from './utils/auth.spec-util';
import { parseJson } from './utils/base.spec-util';

describe('Auth Features', () => {
  let auth = new AuthSpec(authRoute);

  it('should not be signup', async () => {
    const response = await auth.signup({
      name: 'Super Admin',
      email: 'suadmin@mail.com',
      password: '123456',
    });
    expect(response.status).toBe(400);
  });

  it('should be signup', async () => {
    auth = await processSignup(auth);
  });

  it('should not be signup with same user', async () => {
    const response = await auth.signup();
    expect(response.status).toBe(409);
  });

  it('should be verify', async () => {
    const response = await auth.verify();
    expect(response.status).toBe(200);
    expect((await parseJson(response))?.message ?? '').toBe('Verified!');
  });

  it('should be signin', async () => {
    auth = await processSignin(auth);
  });

  it('should not be signin', async () => {
    const response = await auth.signin({
      email: 'stranger@mail.com',
      password: 'password',
    });
    expect(response.status).toBe(401);
  });

  it('should be logout', async () => {
    const response = await auth.logout();
    expect(response.status).toBe(200);
    expect((await parseJson(response))?.message).toBe('Logout successfully!');
  });
});
