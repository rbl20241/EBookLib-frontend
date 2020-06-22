import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {RenameService} from '../../shared/services/rename.service';
import {UserService} from '../../shared/services/user.service';
//import {Separator} from '../../models/separator.model';
//import {Format} from '../../models/format.model';
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
    this.initDatabase();
    //this.initSeparators();
    //this.initFormats();
    this.renameForm = this.renameService.constructRenameForm();
    this.userService.getCurrentUserId()
      .subscribe(userId => {
        this.renameService.getRenameByUserId(userId)
          .subscribe(rename => {
            this.newRename = false;
            this.populateForm(rename);
          });
      });

    if (this.newRename) {
      this.userService.getCurrentUserId()
        .subscribe(userId => {
          this.renameService.getStandardValues(userId)
            .subscribe(rename => {
              this.populateForm(rename);
            });
        });
    }
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

  public initDatabase() {
    this.renameService.init()
      .pipe(take(1))
      .subscribe(response => {
//           this.showToaster();
          console.log('initDatabase');
        }
      );
  }

//   public initSeparators() {
//     this.renameService.getAllSeparators()
//       .pipe(take(1))
//       .subscribe(separators => {
//         console.log(separators);
//         for (let i = 0; i < separators.length; i++) {
//           this.allSeparators[i].value = separators[i].name;
//           this.allSeparators[i].viewValue = separators[i].value;
//         }
//         console.log(this.allSeparators);
//         //this.allSeparators = separators;
//       });
//   }
//
//   public initFormats() {
//     this.renameService.getAllFormats()
//       .pipe(take(1))
//       .subscribe(formats => {
//         console.log(formats);
//         for (let i = 0; i < formats.length; i++) {
//           this.allFormats[i].value = formats[i].name;
//           this.allFormats[i].viewValue = formats[i].value;
//         }
//         console.log(this.allFormats);
//         //this.allFormats = formats;
//       });
//   }

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

  public saveRename() {
    const rename: Rename = this.renameForm.value as Rename;
    //rename.sourceTitleAuthorSeparator = this.getSeparator(this.ctrls.sourceTitleAuthorSeparator.value);
    //console.log('sourceTitleAuthorSeparator ' +  rename.sourceTitleAuthorSeparator);
    //console.log('sourceTitleAuthorSeparator ' +  rename.sourceTitleAuthorSeparator.id + ' ' + rename.sourceTitleAuthorSeparator.name + ' ' + rename.sourceTitleAuthorSeparator.value);

    // post won't execute without subscribe. After calling succesfully, go back to last page
//    alert(JSON.stringify(rename));
    if (this.newRename) {
      //console.log(rename);
      this.renameService.addRename(rename)
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
    else {
      this.renameService.updateRename(rename)
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
  }

  private showToaster() {
      this.toastr.success('Hernoemen voltooid');
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

  private getSeparator(name: string): Separator {
    this.renameService.getSeparatorByName(name)
      .pipe(take(1))
      .subscribe(separator => {
        console.log('separator ' + separator.name + ' ' + separator.value);
        return separator;
      },
      error => {
          console.log(error);
          this.errorMessage = error.message;
        }
      );

    return null;
  }

}



