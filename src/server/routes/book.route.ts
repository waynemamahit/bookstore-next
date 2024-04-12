import { Context, Hono } from 'hono';
import { DtoItem } from '../../interfaces/Base';
import {
  bookDtoSchema,
  bookParamSchema,
  getBookQuerySchema,
} from '../../validations/zod/book.validation';
import BookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { validate } from '../middlewares/pipe.middleware';

const controller = new BookController();
const param: DtoItem = { schema: bookParamSchema, type: 'param' };
const body: DtoItem = { schema: bookDtoSchema, type: 'json' };

const bookRoute = new Hono()
  .get(
    '/',
    validate({ schema: getBookQuerySchema, type: 'query' }),
    (c: Context) => controller.getBook(c)
  )
  .put('/:id', validate(param), (c: Context) => controller.showBook(c))
  .post('/', userAuth([1]), validate(body), (c: Context) =>
    controller.addBook(c)
  )
  .patch('/:id', userAuth([1]), validate(param, body), (c: Context) =>
    controller.updateBook(c)
  )
  .delete('/:id', userAuth([1]), validate(param), (c: Context) =>
    controller.deleteBook(c)
  );

export default bookRoute;
