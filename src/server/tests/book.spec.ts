import { describe, expect, it } from 'vitest';
import { GetBook } from '../../interfaces/Book';
import { BookDto } from '../../validations/zod/book.validation';
import authRoute from '../routes/auth.route';
import bookRoute from '../routes/book.route';
import AuthSpec from './models/auth.spec-model';
import BookSpec from './models/book.spec-model';
import { processSignin, processSignup } from './utils/auth.spec-util';
import { parseJson } from './utils/base.spec-util';

describe('Book Features', () => {
  const book = new BookSpec(bookRoute);
  let auth = new AuthSpec(authRoute);

  it('should be get books', async () => {
    const response = await book.getBook();
    expect(response.status).toBe(200);
  });

  it('should not show book', async () => {
    const response = await book.showBook();
    expect(response.status).toBe(404);
  });

  it('should be signin as admin', async () => {
    auth = await processSignin(auth, {
      email: 'admin@mail.com',
      password: 'password',
    });
    book.headers = auth.getAuthHeader();
  });

  it('should not add book with invalid dto', async () => {
    const response = await book.addBook({
      title: '',
      writer: '',
      cover_image: '',
      price: 0,
      tags: [],
    });
    expect(response.status).toBe(400);
  });

  it('should add new book', async () => {
    const response = await book.addBook();
    expect(response.status).toBe(201);
    book.data = (await parseJson<GetBook>(response)).data;
  });

  it('should show data new book', async () => {
    const response = await book.showBook(book.data?.id);
    expect(response.status).toBe(200);
  });

  it('should not update book', async () => {
    const response = await book.updateBook(book.data?.id, {
      ...(book.data ?? {}),
      title: '',
    } as BookDto);
    expect(response.status).toBe(400);
  });

  it('should update book', async () => {
    const response = await book.updateBook(book.data?.id, {
      ...(book.data ?? {}),
      title: 'Updated ' + book.data?.title,
    } as BookDto);
    expect(response.status).toBe(200);
    book.data = (await parseJson<GetBook>(response)).data;
  });

  it('should not delete book', async () => {
    const response = await book.deleteBook();
    expect(response.status).toBe(404);
  });

  it('should delete book', async () => {
    const response = await book.deleteBook(book.data?.id);
    expect(response.status).toBe(200);
  });

  it('should not add book without admin', async () => {
    auth = await processSignup(auth);
    book.headers = auth.getAuthHeader();
    const response = await book.addBook();
    expect(response.status).toBe(403);
  });
});
