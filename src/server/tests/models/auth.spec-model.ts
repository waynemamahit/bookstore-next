import { SigninDto, SignupDto } from '../../../validations/zod/auth.validation';
import { AuthMock } from '../mocks/auth.mock';
import BaseSpec from './base.spec-model';

export default class AuthSpec extends BaseSpec {
  mock = new AuthMock();
  token = '';
  userKey = '';

  getAuthHeader = () => ({
    Authorization: 'Bearer ' + this.token,
    Cookie: this.userKey,
  });

  signin = (dto: SigninDto = this.mock.signinDto) =>
    this.request('/signin', 'POST', {
      body: JSON.stringify(dto),
    });

  signup = (dto: SignupDto = this.mock.signupDto) =>
    this.request('/signup', 'POST', {
      body: JSON.stringify(dto),
    });

  verify = () =>
    this.request('/verify', 'GET', {
      headers: this.getAuthHeader(),
    });

  logout = () =>
    this.request('/logout', 'GET', {
      headers: this.getAuthHeader(),
    });
}
