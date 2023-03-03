import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from 'src/models/book.model';
import { UserSettings } from 'src/models/usersettings.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { BookService } from 'src/shared/services/book.service';
import { UserService } from '../../shared/services/user.service';
import { UserSettingsService } from '../../shared/services/usersettings.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from '../../shared/services/modal.service';

import * as JSZip from 'jszip';
import {Identifier} from '../../models/identifier.model';

@Component({
    selector: 'app-book-detail',
    templateUrl: 'book-detail.component.html',
    styleUrls: ['book-detail.component.scss'],
    providers: [ BookService, UserService, UserSettingsService ]
})
export class BookDetailComponent implements OnInit, OnDestroy {
    componentDestroyed$: Subject<boolean> = new Subject();

    book: Book;
    detailForm: FormGroup;
    bookId: number;
    userId: number;
    bookDescription: string;
    // cutPosition: number;
    // isMyBookVar = false;
    // showMore = false;
    // showLess = false;
    editMode = false;
    isReadOrg: boolean;
    isMailModalActive = false;
    isCopyModalActive = false;
    loading = false;
    cover: File = null;
    emptyCoverImage = 'assets/images/book.jpg';
    coverUrl = 'http://localhost:4200';

    constructor(private bookService: BookService, private route: ActivatedRoute, private location: Location,
                private router: Router,
                private toastr: ToastrService, private userService: UserService, private fb: FormBuilder,
                private modalService: ModalService, private userSettingsService: UserSettingsService) {

      this.book = new Book();
      this.detailForm = FormGroup.prototype;
      this.bookId = 0;
      this.userId = 0;
      this.bookDescription = '';
      this.isReadOrg = false;
    }


    ngOnInit() {
      this.loadUserSettings();
      this.detailForm = this.fb.group({
        isbn: '',
        isRead: false,
        copyTo: '',
        mailTo: ''
      });
      this.route.paramMap.subscribe(params => {
          // @ts-ignore
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

    // onUpload() {
    //   this.loading = !this.loading;
    //   this.cover = this.getCoverFile(this.book);
    //   this.bookService.uploadCover(this.cover).subscribe(
    //     (event: any) => {
    //       if (typeof (event) === 'object') {
    //         this.loading = false;
    //       }
    //     }
    //   );
    // }

    // convenience getters for easy access to form fields
    get ctrls() { return this.detailForm.controls; }
    get isbn() { return this.ctrls.isbn as FormControl; }
    get isRead() { return this.ctrls.isRead as FormControl; }
    get copyTo() { return this.ctrls.copyTo as FormControl; }
    get mailTo() { return this.ctrls.mailTo as FormControl; }

    private loadBook() {
        this.bookService.getBookById(this.bookId)
          .pipe(takeUntil(this.componentDestroyed$))
          .subscribe(book => {
            this.book = book;
            console.log('image: ' + book.tempImageLink);
            this.detailForm.value.isRead = this.stringToBoolean(book.isRead);
            this.bookDescription = book.description;
        });
    }

    private loadUserSettings() {
      this.userService.getCurrentUserId()
        .subscribe(userId => {
          this.userSettingsService.getUserSettingsByUserId(userId)
            .subscribe(userSettingsService => {
              this.ctrls.copyTo.setValue(userSettingsService.copyTo);
              this.ctrls.mailTo.setValue(userSettingsService.mailTo);
            });
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

  public hasValue(value: string): boolean {
    if (value === null) {
      return false;
    } else {
      return value.length > 0;
    }
  }

  public createIdentifier(identifier: Identifier) {
    if (this.hasValue(identifier.scheme)) {
      return identifier.scheme + ':' + identifier.value;
    } else {
      return identifier.value;
    }
  }

  public openCopyDialog() {
    this.isCopyModalActive = true;
    this.isMailModalActive = false;
    this.modalService.open('copy-modal');
  }

  public closeCopyDialog() {
    this.isCopyModalActive = false;
    this.modalService.close('copy-modal');
  }

  public copy() {
    this.bookService.copyBook(this.book.id, this.detailForm.value.copyTo).subscribe(data => this.showToaster('K'));
    this.closeCopyDialog();
  }

  public openMailDialog() {
    this.isMailModalActive = true;
    this.isCopyModalActive = false;
    this.modalService.open('mail-modal');
  }

  public closeMailDialog() {
    this.isMailModalActive = false;
    this.modalService.close('mail-modal');
  }

  public mail() {
    this.bookService.sendBook(this.book.id, this.detailForm.value.mailTo).subscribe(data => this.showToaster('M'));
    this.closeMailDialog();
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
      const bookToSave: Book = this.book;
      bookToSave.isbn = this.detailForm.value.isbn;
      bookToSave.isRead = this.booleanToString(this.detailForm.value.isRead);
      // alert(JSON.stringify(bookToSave));
      // post won't execute without subscribe. After calling succesfully, go back to last page
      this.bookService.updateBook(bookToSave)
        .pipe(take(1))
        .subscribe(response => {
          this.showToaster('S');
          if (!this.editMode) {
            this.location.back();
          }
        });
      }
    this.editMode = false;
  }

  public browse() {
    let name = '';
    if (this.book.authors[0] !== undefined) {
      name = this.book.authors[0].name + ' ';
    }
    let search = name  + this.book.title;
    search = search.replace(' ', '+');

    window.open('https://www.google.nl/search?q=' + search, '_blank');
  }

  public calibre() {
    this.bookService.openCalibre(this.bookId).subscribe(data => this.showToaster('C'));
  }

  public readImageLink(book: Book) {
    const bookImageLink  = book.tempImageLink;
    let coverFile;

    if (bookImageLink) {
//      coverFile = new File([''], bookImageLink);
      coverFile = new File([''], this.emptyCoverImage);
    } else {
      coverFile = new File([''], this.emptyCoverImage);
    }

    // const url = this.coverUrl + '/book/' + book.id + '/cover';
    //
    // this.bookService.uploadCover(url, coverFile);
    //
    // console.log('coverFile -> ' + url + '/' + coverFile.name);
    // return url + '/' + coverFile.name;
    return coverFile.name;
  }

  private showToaster(action: string) {
    if (action === 'S') {
      this.toastr.success('Boek opgeslagen');
    }
    else if (action === 'C') {
      this.toastr.success('Calibre wordt gestart');
    }
    else if (action === 'K') {
      this.toastr.success('Boek is gekopieerd');
    }
    else if (action === 'M') {
      this.toastr.success('Boek is verzonden');
    }
  }

  private stringToBoolean(value: string) {
     return value === 'Y';
  }

  private booleanToString(value: boolean) {
    if (value) {
      return 'Y';
    }
    else {
      return 'N';
    }
  }



}
