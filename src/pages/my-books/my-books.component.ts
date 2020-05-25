import {Component, OnDestroy, OnInit} from '@angular/core';
import { Book } from 'src/models/book.model';
import { Router } from '@angular/router';
import { BookService } from 'src/shared/services/book.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'my-books',
    templateUrl: 'my-books.component.html',
    styleUrls: ['my-books.component.scss'],
    providers: [BookService]
})
export class MyBooksComponent implements OnInit, OnDestroy {
    componentDestroyed$: Subject<boolean> = new Subject();
    myBooks: Book[];
    totalNbrBooks: number;
    pageSize = 10;

    constructor(private bookService: BookService, private router: Router) { }

    public ngOnInit(): void {
        this.loadBooksForPage(1);
    }

    ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
    }

    public loadBooksForPage(pageNbr: number) {
        this.bookService.getMyBooks(this.pageSize, pageNbr)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(page => {
            this.myBooks = page.content;
            this.totalNbrBooks = page.totalElements;
        });
    }

    public goToDetailPage(bookId: number) {
        // navigate to detailpage
        this.router.navigateByUrl(`book/${bookId}`);
    }

    public addNewBook() {
        this.router.navigateByUrl(`book/add`);
    }
}
