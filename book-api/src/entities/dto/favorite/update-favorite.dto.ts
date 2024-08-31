import { PartialType } from '@nestjs/mapped-types';
import { FavoriteDto } from 'src/entities/dto/favorite/favorite.dto';

export class UpdateFavoriteDto extends PartialType(FavoriteDto) {}
