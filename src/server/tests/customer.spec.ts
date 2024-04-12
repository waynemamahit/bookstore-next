import { describe, expect, it } from 'vitest';
import { GetCustomer } from '../interfaces/Customer';
import authRoute from '../routes/auth.route';
import customerRoute from '../routes/customer.route';
import AuthSpec from './models/auth.spec-model';
import CustomerSpec from './models/customer.spec-model';
import { processSignin, processSignup } from './utils/auth.spec-util';
import { parseJson } from './utils/base.spec-util';

describe('Customer Features', () => {
  const customer = new CustomerSpec(customerRoute);
  let auth = new AuthSpec(authRoute);

  it('should be signup as customer', async () => {
    auth = await processSignup(auth);
    customer.headers = auth.getAuthHeader();
  });

  it('should not get list customer as customer', async () => {
    const resp = await customer.getCustomer();
    expect(resp.status).toBe(403);
  });

  it('should not get list customer as customer', async () => {
    const resp = await customer.deleteCustomer();
    expect(resp.status).toBe(403);
  });

  it('should be signin as admin', async () => {
    auth = await processSignin(auth, {
      email: 'admin@mail.com',
      password: 'password',
    });
    customer.headers = auth.getAuthHeader();
  });

  it('should get list customer as admin', async () => {
    const resp = await customer.getCustomer();
    expect(resp.status).toBe(200);
    const data = (await parseJson<GetCustomer[]>(resp)).data;
    if (data !== null) customer.data = data[0];
  });

  it('should delete customer as admin', async () => {
    const resp = await customer.deleteCustomer(customer.data?.id);
    expect(resp.status).toBe(200);
  });
});
