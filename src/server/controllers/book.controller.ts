import { Context } from 'hono';
import { StatusCode } from 'hono/utils/http-status';
import { GetBook } from '../../interfaces/Book';
import { APIResponse } from '../../models/Base';
import { BookDto, BookParam } from '../../validations/zod/book.validation';
import BookService from '../services/book.service';

export default class BookController {
  private service = new BookService();

  async getBook(c: Context) {
    const resp = new APIResponse<GetBook[]>('Succcess', 200);
    const res = await this.service.getBook(c.get('dto-query')?.keyword ?? '');
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 404;
      resp.message = '';
      resp.errors = res.error?.message ?? 'Failed to get book list!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async addBook(c: Context) {
    const resp = new APIResponse<GetBook>('New book has been added!', 201);
    const res = await this.service.addBook(c.get('dto-json') as BookDto);
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 409;
      resp.message = '';
      resp.errors = res.error?.message ?? 'Failed add new book data!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async showBook(c: Context) {
    const resp = new APIResponse<GetBook>('Success', 200);
    const res = await this.service.showBook(c.get('dto-param').id);
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 404;
      resp.message = '';
      resp.errors = res.error?.message ?? 'Failed to get book!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async updateBook(c: Context) {
    const resp = new APIResponse<GetBook>('Data book has been updated!', 200);
    const res = await this.service.updateBook(
      (c.get('dto-param') as BookParam)?.id,
      c.get('dto-json') as BookDto
    );
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 409;
      resp.message = '';
      resp.errors = res.error?.message ?? 'Failed add new book data!';
    }

    return c.json(resp, resp.code as StatusCode);
  }

  async deleteBook(c: Context) {
    const resp = new APIResponse<GetBook>('Data book has been deleted', 200);
    const res = await this.service.deleteBook(c.get('dto-param').id);
    resp.data = res.data;

    if (res.data === null) {
      resp.code = 404;
      resp.message = '';
      resp.errors = res.error?.message ?? 'Failed to delete book data!';
    }

    return c.json(resp, resp.code as StatusCode);
  }
}
