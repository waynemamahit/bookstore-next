import { faker } from '@faker-js/faker';
import { BookDto } from '../../../validations/zod/book.validation';

export default class BookMock {
  dto: BookDto = {
    title: faker.commerce.productName(),
    writer: faker.person.fullName(),
    cover_image: faker.image.dataUri(),
    price: Math.floor(Math.random() * 9999999999),
    tags: [faker.commerce.productMaterial()],
  };
}
