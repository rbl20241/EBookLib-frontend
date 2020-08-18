import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UpdateService } from './update.service';
import { BookService } from 'src/shared/services/book.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
    selector: 'update-form',
    providers: [ UpdateService, BookService ],
    templateUrl: 'update.component.html',
    styleUrls: ['update.component.scss']
})

export class BooksUpdateComponent implements OnInit, AfterViewInit {
  updateForm: FormGroup;
  //isUpdateWithApi: boolean;
  isBusy = false;

  constructor(private updateService: UpdateService, private elementRef: ElementRef, private bookService: BookService, private router: Router,
    private location: Location, private toastr: ToastrService) { }

  get ctrls() { return this.updateForm.controls; }
  get isUpdateWithApi() { return this.ctrls.isUpdateWithApi; }

  ngOnInit() {
    this.updateForm = this.updateService.constructUpdateForm();
  }

  ngAfterViewInit() {
//     let scriptElement = document.createElement('update-carousel');
//     scriptElement.type = 'text/javascript';
//     scriptElement.src = 'assets/js/carousel.js';
//     this.elementRef.nativeElement.appendChild(scriptElement);
  }

  update() {
    this.isBusy = true;
    this.bookService.updateDatabase(this.isUpdateWithApi.touched)
      .pipe(take(1))
      .subscribe(response => {
        this.isBusy = false;
        this.showToaster();
        this.location.back();
      }
    );
  }

  cancel() {
    this.location.back();
  }

  private showToaster() {
      this.toastr.success('Database is bijgewerkt');
  }

}
