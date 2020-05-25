import {User} from './user.model';
import {Book} from './book.model';

export class Reservation {
  id: number;
  endDate: string;
  startDate: string;
  status: string;
  declineReason: string;
  borrower: User;
  owner: User;
  book: Book;
}
