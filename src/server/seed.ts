import { genSaltSync, hashSync } from 'bcrypt';
import AuthRepository from './repositories/auth.repository';

const authRepo = new AuthRepository();

(async function main() {
  if (((await authRepo.getRoles()).data?.length ?? 0) === 0) {
    for (const role of ['admin', 'customer']) {
      await authRepo.createRole(role);
    }
    console.log('User role has been created');
  }
  if ((await authRepo.getUser('admin@mail.com')).data === null) {
    await authRepo.createUser({
      name: 'Administrator',
      email: 'admin@mail.com',
      password: hashSync('password', genSaltSync(10)),
      role_id: 1,
    });
    console.log('Administrator has been created');
  }
})();
