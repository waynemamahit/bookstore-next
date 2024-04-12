import { GetBook } from '../../interfaces/Book';
import { BookDto } from '../../validations/zod/book.validation';
import { BaseRepository } from './base.repository';

export default class BookRepository extends BaseRepository {
  getBook = (keyword: string) =>
    this.query<GetBook[]>(() =>
      this.prisma.book.findMany({
        where: {
          OR: [
            {
              title: {
                contains: keyword,
              },
            },
            {
              writer: {
                contains: keyword,
              },
            },
          ],
        },
      })
    );

  addBook = (data: BookDto) =>
    this.query<GetBook>(() =>
      this.prisma.book.create({
        data,
      })
    );

  showBook = (id: number) =>
    this.query<GetBook>(() =>
      this.prisma.book.findFirst({
        where: {
          id,
        },
      })
    );

  updateBook = (id: number, data: BookDto) =>
    this.query<GetBook>(() =>
      this.prisma.book.update({
        data,
        where: {
          id,
        },
      })
    );

  deleteBook = (id: number) =>
    this.query<GetBook>(() =>
      this.prisma.book.delete({
        where: {
          id,
        },
      })
    );
}
