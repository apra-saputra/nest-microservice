import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { FavoriteRepository } from 'src/entities/repository/favorite.repository';
import { BookRepository } from 'src/entities/repository/book.repository';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, FavoriteRepository, BookRepository],
})
export class FavoriteModule {}
