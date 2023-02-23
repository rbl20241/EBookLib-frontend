import { Author } from './author.model';
import { Category } from './category.model';
import { Identifier } from './identifier.model';
import { Genre } from './genre.model';

export class Book {
    id: number;
    filename: string;
    isbn: string;
    author: string;
    title: string;
    imageLink: string;
    tempImageLink: string;
    libraryMap: string;
    publisher: string;
    extension: string;
    language: string;
    description: string;
    isRead: string;
    identifiers: Identifier[];
    authors: Author[];
    categories: Category[];
    genre: Genre;
    timestamp: string;

    constructor() {
      this.id = 0;
      this.filename = '';
      this.isbn =  '';
      this.author =  '';
      this.title =  '';
      this.imageLink =  '';
      this.tempImageLink =  '';
      this.libraryMap =  '';
      this.publisher =  '';
      this.extension =  '';
      this.language =  '';
      this.description =  '';
      this.isRead =  '';
      this.identifiers = [new Identifier()];
      this.authors = [new Author()];
      this.categories = [new Category()];
      this.genre = new Genre();
      this.timestamp =  '';
    }
}
