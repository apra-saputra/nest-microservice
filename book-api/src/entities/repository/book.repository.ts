import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { BookDto } from '../model/book/book.dto';
import { CreateBookDto } from '../model/book/create-book.dto';
import { UpdateBookDto } from '../model/book/update-book.dto';

@Injectable()
export class BookRepository implements OnModuleInit {
  private books: BookDto[] = [];

  // Default book data to insert on module initialization
  private readonly defaultData: BookDto[] = [
    {
      id: 1,
      title: 'Attack on Leningrad',
      desc: 'Occlusion L Com Iliac Art w Extralum Dev, Perc',
      category: 'Romance',
      isActive: true,
    },
    {
      id: 2,
      title: "Rat Race, The (Garson Kanin's The Rat Race)",
      desc: 'Removal of Synthetic Substitute from Mouth and Throat, Endo',
      category: 'Comedy',
      isActive: false,
    },
    {
      id: 3,
      title: 'The Private Life of Deer',
      desc: 'Restrict of Cisterna Chyli with Intralum Dev, Perc Approach',
      category: 'Romance',
      isActive: false,
    },
    {
      id: 4,
      title: 'Tight Spot',
      desc: 'Bypass L Subclav Art to L Pulm Art w Autol Art, Open',
      category: 'Romance',
      isActive: true,
    },
    {
      id: 5,
      title: 'Magic Camp',
      desc: 'Fluoroscopy of Kidney, Ureter, Bladder, R using Oth Contrast',
      category: 'Action',
      isActive: true,
    },
  ];

  onModuleInit() {
    // Initialize repository with default data
    this.books = [...this.defaultData];
  }

  findMany(): BookDto[] {
    return this.books;
  }

  findById(id: number): BookDto | undefined {
    return this.books.find((book) => book.id === id);
  }

  create(createBookDto: CreateBookDto): BookDto {
    const newBook: BookDto = {
      id: this.getIdFromLastBook() + 1, // Incremental ID for new book
      title: createBookDto.title,
      desc: createBookDto.desc,
      category: createBookDto.category,
      isActive: true, // Default to active if not provided
    };
    this.books.push(newBook);
    return newBook;
  }

  update(id: number, updateBookDto: UpdateBookDto): BookDto {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const updatedBook = { ...this.books[bookIndex], ...updateBookDto };
    this.books[bookIndex] = updatedBook;

    return updatedBook;
  }

  delete(id: number): void {
    const bookIndex = this.books.findIndex((book) => book.id === id);

    if (bookIndex === -1) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    this.books.splice(bookIndex, 1);
  }

  private getIdFromLastBook() {
    const book = this.books[this.books.length - 1];
    return book.id;
  }
}
