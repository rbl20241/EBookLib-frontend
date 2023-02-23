import {Book} from './book.model';

export class Page {
  totalElements: number;
  totalPages: number;
  content: Book[];

  constructor() {
    this.totalElements = 0;
    this.totalPages = 0;
    this.content = [new Book()];
  }
}
