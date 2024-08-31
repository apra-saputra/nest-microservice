import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { CreateFavoriteDto } from '../entities/model/favorite/create-favorite.dto';
import { FavoriteRepository } from 'src/entities/repository/favorite.repository';
import { FormatResponse } from 'src/utils/response/formatResponse.decorator';
import { BookRepository } from 'src/entities/repository/book.repository';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly favoriteRepository: FavoriteRepository,
    private readonly bookRepository: BookRepository,
  ) {}

  @FormatResponse('This action adds a new favorite', 'FAVORITIES_CREATED')
  create(createFavoriteDto: CreateFavoriteDto) {
    const book = this.bookRepository.findById(createFavoriteDto.bookId);

    const favorites = this.favoriteRepository.findByUserId(
      createFavoriteDto.userId,
    );

    if (favorites.map((el) => el.bookId).includes(book.id))
      throw new ConflictException('Book has been stored');

    return this.favoriteRepository.create({ ...createFavoriteDto });
  }

  @FormatResponse('This action return all favorite', 'FAVORITIES_GET')
  findAll() {
    return this.favoriteRepository.findMany();
  }

  @FormatResponse(
    'This action return user id: #${0} favorites',
    'USER_FAVORITES_GET',
  )
  findUserId(id: number) {
    const favorites = this.favoriteRepository.findByUserId(id);

    if (favorites.length) {
      favorites.forEach((fav) => {
        const book = this.bookRepository.findById(fav.bookId);

        fav.book = book;
      });
    }

    return favorites;
  }

  @FormatResponse('This action return #${0} favorites', 'FAVORITE_GET')
  findFavorite(userId: number, id: number) {
    const favorites = this.favoriteRepository.findByUserId(userId);

    if (!favorites.length) throw new NotFoundException('User has not content');

    const favorite = this.favoriteRepository.findById(id);

    if (!favorite) throw new NotFoundException('Content is not found');

    return favorite;
  }

  @FormatResponse('This action removes a #${id} favorite', 'FAVORITE_DELETED')
  remove(userId: number, favId: number) {
    const favorite = this.favoriteRepository.findById(favId);

    if (!favorite) throw new NotFoundException('content is not found');

    if (favorite.userId !== userId)
      throw new ConflictException('Request can not process');

    this.favoriteRepository.delete(favorite.id);

    return null;
  }
}
