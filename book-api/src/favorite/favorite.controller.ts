import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { Response } from 'express';
import { AllExceptionsFilter } from 'src/utils/catch.exception';
import { PostFavoriteDto } from './dto/post.dto';
import { ValidationPipe } from 'src/utils/validation.pipe';

@Controller('favorites')
@UseFilters(AllExceptionsFilter)
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post(':userId')
  create(
    @Res() res: Response,
    @Body(new ValidationPipe()) createFavoriteDto: PostFavoriteDto,
    @Param('userId', ParseIntPipe) userId: number,
  ) {
    const responseJson = this.favoriteService.create({
      userId: +userId,
      bookId: +createFavoriteDto.bookId,
    });
    return res
      .status(HttpStatus.CREATED)
      .json({ code: HttpStatus.CREATED, ...responseJson });
  }

  @Get(':userId')
  findOne(@Res() res: Response, @Param('userId', ParseIntPipe) userId: number) {
    const responsejson = this.favoriteService.findUserId(+userId);
    return res
      .status(HttpStatus.OK)
      .json({ code: HttpStatus.OK, ...responsejson });
  }

  @Get(':userId/users/:favoriteId')
  findFavorite(
    @Res() res: Response,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('favoriteId', ParseIntPipe) favoriteId: number,
  ) {
    const responsejson = this.favoriteService.findFavorite(
      +userId,
      +favoriteId,
    );
    return res
      .status(HttpStatus.OK)
      .json({ code: HttpStatus.OK, ...responsejson });
  }

  @Delete(':userId/users/:favoriteId')
  remove(
    @Res() res: Response,
    @Param('userId', ParseIntPipe) userId: number,
    @Param('favoriteId', ParseIntPipe) favoriteId: number,
  ) {
    const responseJson = this.favoriteService.remove(+userId, +favoriteId);
    return res
      .status(HttpStatus.OK)
      .json({ code: HttpStatus.OK, ...responseJson });
  }
}
