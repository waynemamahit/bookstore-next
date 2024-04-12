import { Context } from 'hono';
import {
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
} from 'hono/cookie';
import { SetCookieProps, SetSignedCookieProps } from '../../models/Cookie';
import { env } from './env.util';

export const set =
  (c?: Context) =>
  ({ key, value, expires } = new SetCookieProps()) =>
    setCookie(c as Context, key, value, {
      prefix: 'host',
      secure: true,
      expires,
    });

export const setSigned =
  (c?: Context) =>
  ({ key, value, expires, secret } = new SetSignedCookieProps()) =>
    setSignedCookie(c as Context, key, value, secret, {
      prefix: 'secure',
      secure: true,
      expires,
    });

export const get = (c?: Context) => (key: string) =>
  getCookie(c as Context, '__Host-' + key);

export const getSigned = (c?: Context) => (key: string) =>
  getSignedCookie(c as Context, env(c)().JWT_SECRET, '__Secure-' + key);

export const parseCookie = (cookieString: string) => {
  if (!cookieString || typeof cookieString !== 'string') {
    return {};
  }
  const cookies = cookieString.split(';');
  const result: { [key: string]: string | number | boolean } = {};
  if (cookies.length > 0) {
    for (const cookie of cookies) {
      const parts = cookie.split('=');
      const key = decodeURIComponent(parts[0].trim());
      const value = decodeURIComponent(parts.slice(1).join('=').trim());
      result[key] = value;
    }
  }
  return result;
};
