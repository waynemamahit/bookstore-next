import { faker } from '@faker-js/faker';
import { SigninDto, SignupDto } from '../../../validations/zod/auth.validation';

export class AuthMock {
  signinDto: SigninDto = {
    email: '',
    password: 'password',
  };

  signupDto: SignupDto = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'password',
  };

  constructor() {
    this.signinDto.email = this.signupDto.email;
  }
}
