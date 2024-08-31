import { PartialType } from '@nestjs/mapped-types';
import { FavoriteDto } from './favorite.dto';

export class CreateFavoriteDto extends PartialType(FavoriteDto) {
  userId: number;
  bookId: number;
}
