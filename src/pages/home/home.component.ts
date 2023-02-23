import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BookService } from 'src/shared/services/book.service';
import { Router } from '@angular/router';
import { Book } from 'src/models/book.model';
import { CategoryService } from '../../shared/services/category.service';
import { GenreService } from '../../shared/services/genre.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'home',
  templateUrl: 'home.component.html',
  providers: [BookService, CategoryService, GenreService],
  styleUrls: ['home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();

  isSearchModalActive = false;
  books: Book[];
  totalNbrBooks: number;
  pageSize = 10;

  // popup zoeken
  whatToSearch: string;
  searchQuery: string;
  searchGenre: string;
  searchCategory: string;
  searchExtension: string;
  searchLanguage: string;

  // public allGenres = [];
  // public allCategories = [];
  allGenres: string[];
  allCategories: string[];

  constructor(private bookService: BookService,
              private categoryService: CategoryService,
              private genreService: GenreService,
              private modalService: ModalService,
              private router: Router) {

      // this.books = [];
      this.totalNbrBooks = 0;
      this.whatToSearch = '';
      this.searchQuery = '';
      this.searchGenre = '';
      this.searchCategory = '';
      this.searchExtension = '';
      this.searchLanguage = '';
      this.allGenres = [];
      this.allCategories = [];
    }

    ngOnInit() {
      this.getAllGenres();
      this.getAllCategories();
      this.whatToSearch = 'searchTitleOrAuthor';
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

    private getAllCategories() {
      this.categoryService.getCategories()
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(myArray => {
          this.allCategories = myArray;
      });
    }

    public showBookListBasedOnGenre(genre: string) {
      this.router.navigateByUrl(`genre/${genre}`);
    }

    public showSearchBookList(whatToSearch: string, query: string, genre: string, category: string, extension: string, language: string) {
      this.router.navigateByUrl(`search/${whatToSearch}/${query}/${genre}/${category}/${extension}/${language}`);
    }

    public browseAllBooks() {
      this.router.navigateByUrl(`books`);
    }

    public goToDetailPage(bookId: number) {
      // navigate to detailpage
      this.router.navigateByUrl(`book/${bookId}`);
  }

  public resetSearch() {
    this.searchQuery = '';
    this.books = [new Book()];
    this.totalNbrBooks = 0;
  }

  public openSearchDialog() {
    this.isSearchModalActive = true;
    this.modalService.open('search-modal');
  }

  public closeSearchDialog() {
    this.isSearchModalActive = false;
    this.modalService.close('search-modal');
  }

    public searchBooks(pageNum: number) {
      if (this.searchQuery.length === 0) {
        this.resetSearch();
        return;
      }
      this.closeSearchDialog();
      this.bookService.searchBooks(this.whatToSearch,
        this.searchQuery, this.searchGenre, this.searchCategory, this.searchExtension, this.searchLanguage, pageNum, this.pageSize)
        .pipe(takeUntil(this.componentDestroyed$))
        .subscribe(page => {
        this.books = page.content;
        this.totalNbrBooks = page.totalElements;
      });
    }

    public resetSearchInput() {
      this.searchQuery = '';
    }

}
