import { PartialType } from '@nestjs/mapped-types';
import { FavoriteDto } from 'src/entities/dto/favorite/favorite.dto';

export class CreateFavoriteDto extends PartialType(FavoriteDto) {
  userId: number;
  bookId: number;
}
