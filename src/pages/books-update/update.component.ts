import { Component } from '@angular/core';
import { BookService } from 'src/shared/services/book.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';

@Component({
    selector: 'update-form',
    providers: [ BookService ],
    templateUrl: 'update.component.html',
    styleUrls: ['update.component.scss']
})

export class BooksUpdateComponent {
  isBusy = false;

  constructor(private bookService: BookService, private router: Router,
    private location: Location, private toastr: ToastrService) { }

  update() {
    this.isBusy = true;
    this.bookService.updateDatabase()
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
