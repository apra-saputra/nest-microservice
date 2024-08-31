import { BookDto } from '../book/book.dto';

export class FavoriteDto {
  id: number;
  bookId: number;
  userId: number;
  book?: BookDto;
}
