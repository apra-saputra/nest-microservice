import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { FavoriteDto } from '../model/favorite/favorite.dto';
import { CreateFavoriteDto } from '../model/favorite/create-favorite.dto';
import * as fs from 'fs';
import { BaseRepository } from './base.repository';

@Injectable()
export class FavoriteRepository extends BaseRepository<FavoriteDto> {
  constructor(){
    super('./src/entities/favorite.json')
  }

  protected get favorites () : FavoriteDto[]{
    return this.localData
  }

  findMany(): FavoriteDto[] {
    return this.favorites;
  }

  findById(id: number): FavoriteDto | undefined {
    return this.favorites.find((favorite) => favorite.id === id);
  }

  findByUserId(userId: number): FavoriteDto[] {
    return this.favorites.filter((favorite) => favorite.userId === userId);
  }

  create(createFavoriteDto: CreateFavoriteDto): FavoriteDto {
    const newFavorite: FavoriteDto = {
      id: this.getLastFavoriteId() + 1, // Incremental ID for new favorite
      userId: createFavoriteDto.userId,
      bookId: createFavoriteDto.bookId,
    };

    this.favorites.push(newFavorite);

    this.save();

    return newFavorite;
  }

  delete(id: number): void {
    const favoriteIndex = this.favorites.findIndex(
      (favorite) => favorite.id === id,
    );

    if (favoriteIndex === -1) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    this.favorites.splice(favoriteIndex, 1);

    this.save()
  }

  // handling id
  private getLastFavoriteId(): number {
    const id = this.favorites.length
      ? this.favorites[this.favorites.length - 1].id
      : 0;

    return id;
  }
}
