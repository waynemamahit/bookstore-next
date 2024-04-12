import { Env, Hono } from 'hono';

export default class BaseSpec {
  private app: Hono<Env>;

  constructor(app: Hono<Env>) {
    this.app = app;
  }

  protected request = async (url: string, method: string, opts = {}) =>
    this.app.request(url, {
      method,
      ...opts,
    });
}
