import { expect } from 'vitest';
import { AuthResponse } from '../../../interfaces/Auth';
import { SigninDto } from '../../../validations/zod/auth.validation';
import AuthSpec from '../models/auth.spec-model';
import { parseJson } from './base.spec-util';

export const processSignin = async (auth: AuthSpec, body?: SigninDto) => {
  const response = await auth.signin(body);
  expect(response.status).toBe(200);
  const data = await parseJson<AuthResponse>(response);
  auth.token = data?.data?.token ?? '';
  auth.userKey = `${response.headers.get('set-cookie')}`;
  expect(data?.message ?? '').toBe('Sign in successfully!');
  return auth;
};

export const processSignup = async (auth: AuthSpec) => {
  const response = await auth.signup();
  expect(response.status).toBe(201);
  const data = await parseJson<AuthResponse>(response);
  auth.token = data?.data?.token ?? '';
  auth.userKey = `${response.headers.get('set-cookie')}`;
  expect(data?.message).toBe('Sign up successfully!');
  return auth;
};
