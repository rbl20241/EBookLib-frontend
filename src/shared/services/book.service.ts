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
    return this.httpClient.get<Book>( url, {params: parms, headers: this.constructAuthHeaders()});
  }

  public getAllBooks(pageSize: number, pageNum: number): Observable<Page> {
    // httpParams is immutable therefore we need to chain the append method!
    const parms = new HttpParams()
      .append('size', String(pageSize))
      .append('pageNo', String(pageNum));
    return this.httpClient.get<Page>(this.booksUrl, {params: parms, headers: this.constructAuthHeaders()});
  }

  public updateDatabase(isUpdateWithApi: boolean): Observable<string> {
    const params = new HttpParams()
      .append('useApi', String(isUpdateWithApi));
    const url = this.booksUrl;
    return this.httpClient.post<string>(url, params, {headers: this.constructAuthHeaders()});
  }

  public getBooksForGenre(genre: string, pageSize: number, pageNum: number): Observable<Page> {
    const parms = new HttpParams()
      .append('genre', genre)
      .append('size', String(pageSize))
      .append('pageNo', String(pageNum));
    const url = this.booksUrl + '/genre';
    return this.httpClient.get<Page>(url, {params: parms, headers: this.constructAuthHeaders()});
  }

  public updateBook(book: Book): Observable<string> {
    const url = this.booksUrl + '/update';
    return this.httpClient.put<string>(url, book, {headers: this.constructAuthHeaders()});
  }

  public searchBooks(whatToSearch: string, query: string, genre: string, category: string,
                     extension: string, language: string, size: number, pageNum: number): Observable<Page> {
    const parms = new HttpParams()
      .append('whatToSearch', whatToSearch)
      .append('query', query)
      .append('category', category)
      .append('genre', genre)
      .append('extension', extension)
      .append('language', language)
      .append('size', String(size))
      .append('pageNo', String(pageNum));
    const url = this.booksUrl + '/search';
    console.log(parms);
    return this.httpClient.get<Page>(url, {params: parms, headers: this.constructAuthHeaders()});
  }

  public getBookByIsbn(isbn: string): Observable<Book> {
    const parms = new HttpParams().append('identifier', isbn);
    const url = this.BASE_URL + '/search/isbn';
    return this.httpClient.get<Book>(url, {params: parms, headers: this.constructAuthHeaders()});
  }

  public copyBook(id: number, copyTo: string): Observable<Book> {
    const parms = new HttpParams()
      .append('bookId', String(id))
      .append('copyTo', String(copyTo));
    const url = this.booksUrl + '/copy';
    return this.httpClient.get<Book>( url, {params: parms, headers: this.constructAuthHeaders()});
  }

  public sendBook(id: number, mailTo: string): Observable<Book> {
    const parms = new HttpParams()
      .append('bookId', String(id))
      .append('mailTo', String(mailTo));
    const url = this.booksUrl + '/mail';
    console.log(url + ' ' + id);
    return this.httpClient.get<Book>( url, {params: parms, headers: this.constructAuthHeaders()});
  }

  public openCalibre(id: number): Observable<Book> {
    const parms = new HttpParams()
      .append('bookId', String(id))
      .append('mailTo', String('rene.ordina@gmail.com'));
    const url = this.booksUrl + '/calibre';
    console.log(url + ' ' + id);
    return this.httpClient.get<Book>( url, {params: parms, headers: this.constructAuthHeaders()});
  }

}
