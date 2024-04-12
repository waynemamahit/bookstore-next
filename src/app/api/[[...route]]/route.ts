import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { csrf } from 'hono/csrf';
import { logger } from 'hono/logger';
import { poweredBy } from 'hono/powered-by';
import { secureHeaders } from 'hono/secure-headers';
import { handle } from 'hono/vercel';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { limiter } from '../../../server/middlewares/limiter.middleware';
import authRoute from '../../../server/routes/auth.route';
import bookRoute from '../../../server/routes/book.route';
import customerRoute from '../../../server/routes/customer.route';
import orderRoute from '../../../server/routes/order.route';

const app = new Hono().basePath('/api/v1');
const rateLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60,
});

app.use('*', cors());
app.use('*', csrf());
app.use('*', logger());
app.use('*', poweredBy());
app.use('*', secureHeaders());
app.use('*', limiter(rateLimiter));

app.route('/auth', authRoute);
app.route('/book', bookRoute);
app.route('/customer', customerRoute);
app.route('/order', orderRoute);

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);
