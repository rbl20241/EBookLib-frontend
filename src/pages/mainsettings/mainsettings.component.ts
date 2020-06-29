import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MainSettingsService} from '../../shared/services/mainsettings.service';
import {MainSettings} from '../../models/mainsettings.model';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'mainsettings',
  providers: [MainSettingsService],
  templateUrl: 'mainsettings.component.html',
  styleUrls: ['mainsettings.component.scss']
})
export class MainSettingsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  errorMessage: string;
  mainSettingsForm: FormGroup;
  newSettings = true;

  constructor(private mainSettingsService: MainSettingsService, private toastr: ToastrService, private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit() {
    this.mainSettingsForm = this.mainSettingsService.constructMainSettingsForm();
    this.mainSettingsService.getMainSettings()
      .subscribe(mainSettings => {
        this.newSettings = false;
        this.populateForm(mainSettings);
      });
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.mainSettingsForm.controls; }
  get libraryMap() { return this.ctrls.libraryMap; }
  get calibreCommand() { return this.ctrls.calibreCommand; }

  public saveMainSettings() {
    const mainSettings: MainSettings = this.mainSettingsForm.value as MainSettings;
    // post won't execute without subscribe. After calling succesfully, go back to last page
    if (this.newSettings) {
      this.mainSettingsService.saveMainSettings(mainSettings)
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
      this.mainSettingsService.updateMainSettings(mainSettings)
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

  cancel() {
    this.location.back();
  }

  private showToaster() {
      this.toastr.success('Instellingen opgeslagen');
  }

  private populateForm(mainSettings: MainSettings) {
    if (mainSettings.id) {
      this.ctrls.id.setValue(mainSettings.id);
      this.ctrls.libraryMap.setValue(mainSettings.libraryMap);
      this.ctrls.calibreCommand.setValue(mainSettings.calibreCommand);
    }
  }
}
