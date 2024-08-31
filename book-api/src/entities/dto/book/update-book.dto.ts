import { PartialType } from '@nestjs/mapped-types';
import { BookDto } from 'src/entities/dto/book/book.dto';

export class UpdateBookDto extends PartialType(BookDto) {}
