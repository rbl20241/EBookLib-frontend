import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RenameService} from '../../shared/services/rename.service';
import {Separator} from '../../shared/util/separator';
import {Format} from '../../shared/util/format';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'rename',
  providers: [RenameService],
  templateUrl: 'rename.component.html',
  styleUrls: ['rename.component.scss']
})
export class RenameComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  errorMessage: string;
  renameForm: FormGroup;

  allSeparators: Array<Separator> = [
    {
      id: 0,
      name: 'HYPHEN',
      value: '-'
    },
    {
      id: 1,
      name: 'COMMA',
      value: ','
    },
    {
      id: 2,
      name: 'SPACE',
      value: ' '
    }
  ];

  allFormats: Array<Format> = [
    {
      id: 0,
      name: 'tva',
      value: '<titel> <voornaam> <achternaam>'
    },
    {
      id: 1,
      name: 'tav',
      value: '<titel> <achternaam> <voornaam>'
    },
    {
      id: 2,
      name: 'vat',
      value: '<voornaam> <achternaam> <titel>'
    },
    {
      id: 3,
      name: 'avt',
      value: '<achternaam> <voornaam> <titel>'
    }
  ];

  constructor(private renameService: RenameService, private toastr: ToastrService, private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.renameForm = this.renameService.constructRenameForm();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.renameForm.controls; }
  get sourceMap() { return this.ctrls.sourceMap; }
  get destinationMap() { return this.ctrls.destinationMap; }
//   get calibreCommand() { return this.ctrls.calibreCommand; }
//   get copyTo() { return this.ctrls.copyTo }
//   get mailTo() { return this.ctrls.mailTo }
//   get mailHost() { return this.ctrls.mailHost }
//   get mailPort() { return this.ctrls.mailPort }
//   get mailUserName() { return this.ctrls.mailUserName }
//   get mailPassword() { return this.ctrls.mailPassword }

  public run() {
    // post won't execute without subscribe. After calling succesfully, go back to last page
      this.renameService.run()
        .pipe(take(1))
        .subscribe(
        response => {
          this.showToaster();
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

  private showToaster() {
      this.toastr.success('Hernoemen voltooid');
  }

//   private populateForm(settings: Settings) {
//     if (settings.libraryMap) {
//       this.ctrls.id.setValue(settings.id);
//       this.ctrls.userId.setValue(settings.userId);
//       this.ctrls.libraryMap.setValue(settings.libraryMap);
//       this.ctrls.calibreCommand.setValue(settings.calibreCommand);
//       this.ctrls.copyTo.setValue(settings.copyTo);
//       this.ctrls.mailTo.setValue(settings.mailTo);
//       this.ctrls.mailHost.setValue(settings.mailHost);
//       this.ctrls.mailPort.setValue(settings.mailPort);
//       this.ctrls.mailUserName.setValue(settings.mailUserName);
//       this.ctrls.mailPassword.setValue(settings.mailPassword);
//     }
//   }
}

// class Seperator {
//   name: string;
//   value: string;
// }
