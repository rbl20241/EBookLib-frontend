import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Book} from 'src/models/book.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Page} from '../../models/page.model';

@Injectable()
export class BookService extends BaseService {

  private booksUrl = this.BASE_URL + '/books';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getBookById(id: number): Observable<Book> {
    const parms = new HttpParams().append('bookId', String(id));
    const url = this.booksUrl + '/bookid';
    return this.httpClient.get<Book>( url, {params: parms, headers: this.constructHeaders()});
  }

  public openCalibre(id: number): Observable<Book> {
    const parms = new HttpParams().append('bookId', String(id));
    const url = this.booksUrl + '/calibre/bookid';
    console.log("<-- CALIBRE --> " + url + parms);
    return this.httpClient.put<Book>( url, {params: parms, headers: this.constructHeaders()});
  }

  public getAllBooks(pageSize: number, pageNum: number): Observable<Page> {
    // httpParams is immutable therefore we need to chain the append method!
    const parms = new HttpParams().append('size', String(pageSize)).append( 'pageNo', String(pageNum));
    return this.httpClient.get<Page>(this.booksUrl, {params: parms, headers: this.constructHeaders()});
  }

  public getMyBooks(pageSize: number, pageNum: number): Observable<Page> {
    const parms = new HttpParams().append('size', String(pageSize)).append( 'pageNo', String(pageNum));
    const url = this.booksUrl + '/my-books';
    return this.httpClient.get<Page>(url, {params: parms, headers: this.constructHeaders()});
  }

  public updateDatabase(): Observable<string> {
    const url = this.booksUrl;
    return this.httpClient.post<string>(url, null, {headers: this.constructHeaders()});
  }

  public addBook(book: Book): Observable<string> {
    return this.httpClient.post<string>(this.booksUrl, book, {headers: this.constructHeaders()});
  }

//   public deleteBook(bookOwnerId: number): Observable<string> {
//     const parms = new HttpParams().append('bookOwnerId', String(bookOwnerId));
//     const url = this.bookOwnerUrl + '/remove-owner';
//     return this.httpClient.delete<string>(url, {params: parms, headers: this.constructHeaders()});
//   }

  public getBooksForGenre(genre: string, pageSize: number, pageNum: number): Observable<Page> {
    const parms = new HttpParams()
      .append('genre', genre)
      .append('size', String(pageSize))
      .append('pageNo', String(pageNum));
    const url = this.booksUrl + '/genre';
    return this.httpClient.get<Page>(url, {params: parms, headers: this.constructHeaders()});
  }

//   public getBooksForCategory(category: string, pageSize: number, pageNum: number): Observable<Page> {
//     const parms = new HttpParams()
//       .append('category', category)
//       .append('size', String(pageSize))
//       .append('pageNo', String(pageNum));
//     const url = this.booksUrl + '/category';
//     return this.httpClient.get<Page>(url, {params: parms, headers: this.constructHeaders()});
//   }

//   public updateBooks(): Observable<string> {
//     const url = this.booksUrl + '/update';
//     console.log(url);
//     return this.httpClient.put<string>(url, {headers: this.constructHeaders()});
//   }

  public updateBook(book: Book): Observable<string> {
    const url = this.booksUrl + '/update';
    return this.httpClient.put<string>(url, book, {headers: this.constructHeaders()});
  }

  public searchBooksByTitleOrAuthor(query, pageNum, size): Observable<Page> {
    const parms = new HttpParams()
      .append('query', query)
      .append('size', String(size))
      .append('pageNo', String(pageNum));
    const url = this.booksUrl + '/search';
    return this.httpClient.get<Page>(url, {params: parms, headers: this.constructHeaders()});
  }

  public getBookByIsbn(isbn: string): Observable<Book> {
    const parms = new HttpParams().append('identifier', isbn);
    const url = this.BASE_URL + '/search/isbn';
    return this.httpClient.get<Book>(url, {params: parms, headers: this.constructHeaders()});
  }

  public sendBook(id: number, mailTo: string) : Observable<Book>{
    const parms = new HttpParams()
      .append('bookId', String(id))
      .append('mailTo', String(mailTo));
    const url = this.booksUrl + '/mail';
    return this.httpClient.get<Book>( url, {params: parms, headers: this.constructHeaders()});
  }

}