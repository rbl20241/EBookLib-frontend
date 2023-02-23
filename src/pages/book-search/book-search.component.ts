import {Component, OnDestroy, OnInit} from '@angular/core';
import { BookService } from 'src/shared/services/book.service';
import {Book} from '../../models/book.model';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'book-search',
  templateUrl: 'book-search.component.html',
  styleUrls: ['book-search.component.scss'],
  providers: [BookService]
})

export class BookSearchComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  allBooks: Book[];
  whatToSearch: string;
  query: string;
  genre: string;
  category: string;
  extension: string;
  language: string;
  totalNbrBooks: number;
  pageSize = 10;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute,  private router: Router) {
    this.allBooks = [new Book()];
    this.whatToSearch = '';
    this.query = '';
    this.genre = '';
    this.category = '';
    this.extension = '';
    this.language = '';
    this.totalNbrBooks = 0;
  }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(take(1))
      .subscribe(params => {
        this.whatToSearch = this.getStringParam(params, 'whatToSearch');
        this.query = this.getStringParam(params, 'query');
        this.genre = this.getStringParam(params, 'genre');
        this.category = this.getStringParam(params, 'category');
        this.extension = this.getStringParam(params, 'extension');
        this.language = this.getStringParam(params, 'language');
        this.loadBooksForPage(1);
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public loadBooksForPage(pageNbr: number) {
    this.bookService
      .searchBooks(this.whatToSearch, this.query, this.genre, this.category, this.extension, this.language, this.pageSize, pageNbr)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(page => {
      this.allBooks = page.content;
      this.totalNbrBooks = page.totalElements;
    });
  }

  public goToDetailPage(bookId: number) {
    // navigate to detailpage
    this.router.navigateByUrl('book/' + bookId);
  }

  public showValue(value: string): string {
    if (value === 'searchTitleOrAuthor') {
      return 'Titel en / of auteur';
    }
    else if (value === 'searchDescription') {
      return 'Beschrijving';
    } else {
      return value === 'undefined' ? '-' : value;
    }
  }

  private getStringParam(params: ParamMap, param: string): string {
    const value = params.get(param);
    if (typeof value === 'string') {
      return value;
    } else {
      return '';
    }
  }

}
