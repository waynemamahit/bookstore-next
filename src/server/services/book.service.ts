import { BookDto } from '../../validations/zod/book.validation';
import BookRepository from '../repositories/book.repository';
import BaseService from './base.service';

export default class BookService extends BaseService {
  private repo = new BookRepository();

  getBook = (keyword = '') => this.repo.getBook(keyword);

  addBook = (dto: BookDto) => this.repo.addBook(dto);

  showBook = (id: number) => this.repo.showBook(id);

  updateBook = (id: number, dto: BookDto) => this.repo.updateBook(id, dto);

  deleteBook = (id: number) => this.repo.deleteBook(id);
}
