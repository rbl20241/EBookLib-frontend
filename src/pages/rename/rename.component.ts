import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RenameService} from '../../shared/services/rename.service';
import {UserService} from '../../shared/services/user.service';
import {Rename} from '../../models/rename.model';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

interface Separator {
  value: string;
  viewValue: string;
}

interface Format {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'rename',
  providers: [RenameService, UserService],
  templateUrl: 'rename.component.html',
  styleUrls: ['rename.component.scss']
})
export class RenameComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  errorMessage: string;
  renameForm: FormGroup;

  allSeparators: Separator[] = [
    {value: 'DASH', viewValue: '-'},
    {value: 'COMMA', viewValue: ','},
    {value: 'SPACE', viewValue: ' '}
  ];
  allFormats: Format[] = [
    {value: 'tva', viewValue: '<titel> <voornaam> <achternaam>'},
    {value: 'tav', viewValue: '<titel> <achternaam> <voornaam>'},
    {value: 'vat', viewValue: '<voornaam> <achternaam> <titel>'},
    {value: 'avt', viewValue: '<achternaam> <voornaam> <titel>'},
  ];
  newRename = true;

  constructor(private renameService: RenameService, private userService: UserService, private toastr: ToastrService,
              private location: Location, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.renameForm = this.renameService.constructRenameForm();
    this.userService.getCurrentUserId()
      .subscribe(userId => {
        this.renameService.getRenameByUserId(userId)
          .subscribe(rename => {
            this.populateForm(rename);
          });
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.renameForm.controls; }
  get sourceMap() { return this.ctrls.sourceMap; }
  get sourceTitleAuthorSeparator() { return this.ctrls.sourceTitleAuthorSeparator; }
  get sourceAuthornameSeparator() { return this.ctrls.sourceAuthornameSeparator; }
  get sourceFormat() { return this.ctrls.sourceFormat; }
  get destMap() { return this.ctrls.destMap; }
  get destTitleAuthorSeparator() { return this.ctrls.destTitleAuthorSeparator; }
  get destAuthornameSeparator() { return this.ctrls.destAuthornameSeparator; }
  get destFormat() { return this.ctrls.destFormat; }

  public run() {
    const rename: Rename = this.renameForm.value as Rename;
    // post won't execute without subscribe. After calling succesfully, go back to last page
    this.renameService.run(rename)
      .pipe(take(1))
      .subscribe(
      response => {
        this.showToaster('R');
        this.location.back();
    },
    error => {
        console.log(error);
        this.errorMessage = error.message;
      }
    );
  }

  cancel() {
    this.location.back();
  }

  public saveRename() {
    const rename: Rename = this.renameForm.value as Rename;
    this.renameService.saveRename(rename)
      .pipe(take(1))
      .subscribe(
        response => {
          this.showToaster('S');
        },
        error => {
          console.log(error);
          this.errorMessage = error.message;
        }
      );
  }

  private showToaster(action: string) {
    if (action === 'R') {
      this.toastr.success('Hernoemen voltooid');
    }
    else if (action === 'S') {
      this.toastr.success('Gegevens opgeslagen');
    }
  }

  private populateForm(rename: Rename) {
    this.ctrls.id.setValue(rename.id);
    this.ctrls.userId.setValue(rename.userId);
    this.ctrls.sourceMap.setValue(rename.sourceMap);
    this.ctrls.sourceTitleAuthorSeparator.setValue(rename.sourceTitleAuthorSeparator);
    this.ctrls.sourceAuthornameSeparator.setValue(rename.sourceAuthornameSeparator);
    this.ctrls.sourceFormat.setValue(rename.sourceFormat);
    this.ctrls.destMap.setValue(rename.destMap);
    this.ctrls.destTitleAuthorSeparator.setValue(rename.destTitleAuthorSeparator);
    this.ctrls.destAuthornameSeparator.setValue(rename.destAuthornameSeparator);
    this.ctrls.destFormat.setValue(rename.destFormat);
  }

}



