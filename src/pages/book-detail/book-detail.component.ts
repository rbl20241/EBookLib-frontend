import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'src/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from 'src/shared/services/book.service';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-book-detail',
    templateUrl: 'book-detail.component.html',
    styleUrls: ['book-detail.component.scss'],
    providers: [ BookService, UserService ]
})
export class BookDetailComponent implements OnInit, OnDestroy {
    componentDestroyed$: Subject<boolean> = new Subject();

    book: Book;
    detailForm: FormGroup;
    bookId: number;
    bookDescription: string;
    cutPosition: number;
    isMyBookVar = false;
    showMore = false;
    showLess = false;

    constructor(private bookService: BookService, private route: ActivatedRoute, private location: Location, private router: Router,
                private userService: UserService, private fb: FormBuilder) { }

    ngOnInit() {
        this.detailForm = this.fb.group({
          ownerId: ['', [Validators.required]]
        });
        this.route.paramMap.subscribe(params => {
            this.bookId = +params.get('id');
            this.loadBook();
          });
    }

    ngOnDestroy(): void {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
    }

    // convenience getters for easy access to form fields
    get ctrls() { return this.detailForm.controls; }

    private loadBook() {
        this.bookService.getBookById(this.bookId)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(book => {
            this.book = book;
            this.bookDescription = book.description;
        });
    }

    public capitalize(value) {
      if (value.length > 0) {
        return value.charAt(0).toUpperCase() + value.substr(1);
      } else {
        return value;
      }
    }

  public hasValue(value): boolean {
    if (value === null) {
      return false;
    } else {
      return value.length > 0;
    }
  }

  public createIdentifier(identifier) {
    if (this.hasValue(identifier.scheme)) {
      return identifier.scheme + ':' + identifier.value;
    } else {
      return identifier.value;
    }
  }

  public cancel() {
    this.location.back();
  }

  public browse() {
    var name = '';
    if (this.book.authors[0] !== undefined) {
      name = this.book.authors[0].name + ' ';
    }
    var search = name  + this.book.title
    search = search.replace(" ", "+");

    window.open('https://www.google.nl/search?q=' + search, '_blank');
  }

  public calibre() {
        this.bookService.getBookById(this.bookId)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(book => {
            this.book = book;
            this.bookDescription = book.description;
        });



    console.log('calibre (' + this.bookId + ')');
    this.bookService.openCalibre(this.bookId);
  }

}
