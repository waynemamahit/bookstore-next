export interface GetBook {
  id: number;
  title: string;
  writer: string;
  cover_image: string;
  price: number;
  tags: string[];
}