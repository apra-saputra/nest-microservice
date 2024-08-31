import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from '../entities/dto/book/create-book.dto';
import { UpdateBookDto } from '../entities/dto/book/update-book.dto';
import { Response } from 'express';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @Post()
  // create(@Res() res: Response, @Body() createBookDto: CreateBookDto) {
  //   try {
  //     const result = this.bookService.create(createBookDto);
  //     return res.status(HttpStatus.CREATED).json({
  //       code: HttpStatus.CREATED,
  //       ...result,
  //     });
  //   } catch (error) {
  //     return res
  //       .status(HttpStatus.INTERNAL_SERVER_ERROR)
  //       .json({ code: HttpStatus.INTERNAL_SERVER_ERROR, data: Error });
  //   }
  // }

  @Get()
  findAll(@Res() res: Response) {
    try {
      const result = this.bookService.findAll();
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        ...result,
      });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ code: HttpStatus.INTERNAL_SERVER_ERROR, data: Error });
    }
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id') id: number) {
    // return this.bookService.findOne(+id);
    try {
      const result = this.bookService.findOne(+id);
      return res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        ...result,
      });
    } catch (error) {
      console.log(error);

      if (error instanceof NotFoundException) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ code: HttpStatus.NOT_FOUND, data: error.message });
      }

      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ code: HttpStatus.INTERNAL_SERVER_ERROR, data: Error });
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
  //   return this.bookService.update(id, updateBookDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookService.remove(+id);
  // }
}
