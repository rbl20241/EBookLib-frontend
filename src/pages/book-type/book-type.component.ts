import {Component, OnDestroy, OnInit} from '@angular/core';
import { BookService } from 'src/shared/services/book.service';
import {Book} from '../../models/book.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {take, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';

@Component({
  selector: 'bookType',
  templateUrl: 'book-type.component.html',
  providers: [BookService]
})

export class BookTypeComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  allBooks: Book[];
  category: string;
  totalNbrBooks: number;
  pageSize = 10;

  constructor(private bookService: BookService, private activatedRoute: ActivatedRoute,  private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(take(1))
      .subscribe(params => {
      this.category = params.get('categoryType');
      this.loadBooksForPage(1);
    });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  public loadBooksForPage(pageNbr: number) {
    this.bookService.getBooksForCategory(this.category, this.pageSize, pageNbr)
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

}
