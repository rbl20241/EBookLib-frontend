import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'src/models/book.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from 'src/shared/services/book.service';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import * as JSZip from 'jszip';

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
    editMode = false;
    isReadOrg: boolean;

    constructor(private bookService: BookService, private route: ActivatedRoute, private location: Location, private router: Router,
                private toastr: ToastrService, private userService: UserService, private fb: FormBuilder) { }


    ngOnInit() {
      this.detailForm = this.fb.group({
        isbn: '',
        isRead: false
      });
      this.route.paramMap.subscribe(params => {
          this.bookId = +params.get('id');
          this.loadBook();
      });
      this.populateForm();
    }

    ngOnDestroy(): void {
      if (this.isReadOrg !== this.ctrls.isRead.value) {
        this.save();
      }
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
    }

    // convenience getters for easy access to form fields
    get ctrls() { return this.detailForm.controls; }
    get isbn() { return this.ctrls.isbn as FormControl; }
    get isRead() { return this.ctrls.isRead as FormControl; }

    private loadBook() {
        this.bookService.getBookById(this.bookId)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(book => {
            this.book = book;
            this.detailForm.value.isRead = this.stringToBoolean(book.isRead);
            this.bookDescription = book.description;
        });
    }

    private populateForm() {
        this.bookService.getBookById(this.bookId)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(book => {
            this.ctrls.isbn.setValue(book.isbn);
            this.ctrls.isRead.setValue(this.stringToBoolean(book.isRead));
            this.isReadOrg = this.ctrls.isRead.value;
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

  public back() {
    this.location.back();
  }

  public cancel() {
    this.editMode = false;
  }

  public edit() {
    this.editMode = true;
  }

  public save() {
    if (this.detailForm.value.isbn.length > 0) {
      let bookToSave: Book = this.book;
      bookToSave.isbn = this.detailForm.value.isbn;
      bookToSave.isRead = this.booleanToString(this.detailForm.value.isRead);
      //alert(JSON.stringify(bookToSave));
      // post won't execute without subscribe. After calling succesfully, go back to last page
      this.bookService.updateBook(bookToSave)
        .pipe(take(1))
        .subscribe(response => {
          this.showToaster('U');
          if (!this.editMode) {
            this.location.back();
          }
        });
     }
     this.editMode = false;
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

  public readImageLink(book: Book): string {
    var bookImageLink  = book.imageLink;
    var imageLink = '';

    if (bookImageLink.toLowerCase().startsWith('http')) {
      imageLink = bookImageLink;
    } else if (book.extension.toLowerCase() === 'epub') {
//        console.log('bookImageLink --> ' + bookImageLink);
//        console.log('book.filename --> ' + book.filename);
//       var epub = new JSZip();
//        epub.file(book.filename);
//        epub.folder('images').forEach(function (relativePath, file) {
//                                        console.log("relative path:", relativePath, "file full path:", file.name);
//                                      });
//       epub.loadAsync(book.imageLink)
    }

    if (imageLink.length === 0) {
      imageLink = 'assets/images/book.jpg';
    }

    return imageLink;
  }

  private showToaster(crudAction: string) {
    this.toastr.success('Boek opgeslagen');
  }

  private stringToBoolean(value) {
     return value === 'Y';
  }

  private booleanToString(value) {
    if (value) {
      return "Y";
    }
    else {
      return "N";
    }
  }



}
