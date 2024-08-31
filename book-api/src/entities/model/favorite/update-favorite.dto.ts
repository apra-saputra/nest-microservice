import { PartialType } from '@nestjs/mapped-types';
import { FavoriteDto } from './favorite.dto';

export class UpdateFavoriteDto extends PartialType(FavoriteDto) {}
