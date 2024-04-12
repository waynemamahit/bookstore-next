import { GetBook } from '../../../interfaces/Book';
import BookMock from '../mocks/book.mock';
import BaseSpec from './base.spec-model';

export default class BookSpec extends BaseSpec {
  mock = new BookMock();
  headers = {};
  data: GetBook | null = null;

  getBook = () => this.request('', 'GET');

  showBook = (id = 0) => this.request('/' + id, 'PUT');

  addBook = (dto = this.mock.dto) =>
    this.request('/', 'POST', {
      body: JSON.stringify(dto),
      headers: this.headers,
    });

  updateBook = (id = 0, dto = this.mock.dto) =>
    this.request('/' + id, 'PATCH', {
      body: JSON.stringify(dto),
      headers: this.headers,
    });

  deleteBook = (id = 0) =>
    this.request('/' + id, 'DELETE', {
      headers: this.headers,
    });
}
