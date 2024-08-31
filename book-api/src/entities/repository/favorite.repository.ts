import { Injectable, NotFoundException } from '@nestjs/common';
import { FavoriteDto } from '../dto/favorite/favorite.dto';
import { CreateFavoriteDto } from '../dto/favorite/create-favorite.dto';

@Injectable()
export class FavoriteRepository {
  private favorites: FavoriteDto[] = [];

  // Default favorite data to insert on module initialization
  private readonly defaultData: FavoriteDto[] = [
    {
      id: 1,
      bookId: 1,
      userId: 101,
    },
    {
      id: 2,
      bookId: 3,
      userId: 102,
    },
    {
      id: 3,
      bookId: 2,
      userId: 103,
    },
  ];

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

    return newFavorite;
  }

//   update(id: number, updateFavoriteDto: UpdateFavoriteDto): FavoriteDto {
//     const favoriteIndex = this.favorites.findIndex(
//       (favorite) => favorite.id === id,
//     );

//     if (favoriteIndex === -1) {
//       throw new NotFoundException(`Favorite with ID ${id} not found`);
//     }

//     const updatedFavorite = {
//       ...this.favorites[favoriteIndex],
//       ...updateFavoriteDto,
//     };
//     this.favorites[favoriteIndex] = updatedFavorite;

//     return updatedFavorite;
//   }

  delete(id: number): void {
    const favoriteIndex = this.favorites.findIndex(
      (favorite) => favorite.id === id,
    );

    if (favoriteIndex === -1) {
      throw new NotFoundException(`Favorite with ID ${id} not found`);
    }

    this.favorites.splice(favoriteIndex, 1);
  }

  // handling id
  private getLastFavoriteId(): number {
    const id = this.favorites.length
      ? this.favorites[this.favorites.length - 1].id
      : 1;

    return id;
  }
}
