import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { BookRepository } from 'src/entities/repository/book.repository';

@Module({
  controllers: [BookController],
  providers: [BookService, BookRepository],
})
export class BookModule {}
