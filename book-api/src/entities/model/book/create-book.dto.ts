import { PartialType } from '@nestjs/mapped-types';
import { BookDto } from './book.dto';

export class CreateBookDto extends PartialType(BookDto) {
  title: string;
  category: string;
  desc?: string;
}
