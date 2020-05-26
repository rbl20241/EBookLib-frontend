import { Author } from './author.model';
import { Category } from './category.model';
import { Identifier } from './identifier.model';

export class Book {
    id: number;
    filename: string;
    isbn: string;
    author: string;
    title: string;
    imageLink: string;
    libraryMap: string;
    publisher: string;
    extension: string;
    description: string;
    identifiers: Identifier[];
    authors: Author[];
    categories: Category[];
}
