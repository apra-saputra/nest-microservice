import {
  Controller,
  Get,
  Param,
  Res,
  HttpStatus,
  UseFilters,
  ParseIntPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Response } from 'express';
import { AllExceptionsFilter } from 'src/utils/catch.exception';

@Controller('books')
@UseFilters(AllExceptionsFilter)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll(@Res() res: Response) {
    const result = this.bookService.findAll();
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      ...result,
    });
  }

  @Get(':id')
  findOne(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = this.bookService.findOne(id);
    return res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      ...result,
    });
  }
}
