import {Book} from './book.model';
import {User} from './user.model';

export class BookOwner {
  id: number;
  owner: User;
  book: Book;
  location: string;
  maxBorrowTime: number;
}
