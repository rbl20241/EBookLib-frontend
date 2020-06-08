import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from 'src/shared/services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/models/book.model';
import { CategoryService } from '../../shared/services/category.service';
import { GenreService } from '../../shared/services/genre.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [BookService, CategoryService, GenreService]
})

export class HomeComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  books: Book[];
  totalNbrBooks: number;
  pageSize = 10;
  searchQuery: string;

  public allGenres = [];

  constructor(private bookService: BookService,
                private categoryService: CategoryService,
                private genreService: GenreService,
                private router: Router) {
    }

    ngOnInit() {
      this.getAllGenres();
    }

    ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
    }

    private getAllGenres() {
      this.genreService.getGenres()
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(myArray => {
        this.allGenres = myArray;
      });
    }

    public showBookListBasedOnType(bookType: string) {
      //this.router.navigateByUrl(`category/${bookType}`);
      this.router.navigateByUrl(`genre/${bookType}`);
    }

    public browseAllbooks() {
      this.router.navigateByUrl(`books`);
    }

    public searchBooks(pageNum) {
      if (this.searchQuery.length === 0) {
        this.resetSearch();
        return;
      }
      this.bookService.searchBooksByTitleOrAuthor(this.searchQuery, pageNum, this.pageSize)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(page => {
        this.books = page.content;
        this.totalNbrBooks = page.totalElements;
        // console.log(JSON.stringify(this.books));
      });
    }

    public goToDetailPage(bookId: number) {
      // navigate to detailpage
      this.router.navigateByUrl(`book/${bookId}`);
  }

  public resetSearch() {
    this.searchQuery = '';
    this.books = null;
    this.totalNbrBooks = 0;
  }
}
