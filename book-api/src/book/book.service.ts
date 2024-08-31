import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from '../entities/dto/book/create-book.dto';
import { UpdateBookDto } from '../entities/dto/book/update-book.dto';
import { BookRepository } from 'src/entities/repository/book.repository';
import { FormatResponse } from 'src/utils/formatResponse.decorator';

@Injectable()
export class BookService {
  constructor(private readonly bookRepo: BookRepository) {}

  @FormatResponse('This action create a new book', 'BOOK_CREATED')
  create(createBookDto: CreateBookDto) {
    const book = this.bookRepo.create(createBookDto);
    return book;
  }

  @FormatResponse(`This action returns all book`, 'SUCCESS_GET_BOOKS')
  findAll() {
    const books = this.bookRepo.findMany();
    return books;
  }

  @FormatResponse('This action returns a #${0} book', 'SUCCESS_GET_BOOK')
  findOne(id: number) {
    const book = this.bookRepo.findById(id);

    if (!book) throw new NotFoundException('content is not found');

    return book;
  }

  @FormatResponse('This action updates a #${id} book', 'BOOK_UPDATED')
  update(id: number, updateBookDto: UpdateBookDto) {
    return this.bookRepo.update(id, updateBookDto);
  }

  @FormatResponse('This action removes a #${id} book', 'BOOK_DELETED')
  remove(id: number) {
    this.bookRepo.delete(id);
    return null;
  }
}
