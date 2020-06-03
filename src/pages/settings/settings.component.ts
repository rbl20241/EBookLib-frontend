import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {SettingsService} from '../../shared/services/settings.service';
import {Settings} from '../../models/settings.model';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'settings',
  providers: [SettingsService, UserService],
  templateUrl: 'settings.component.html',
  styleUrls: ['settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  errorMessage: string;
  settingsForm: FormGroup;
  newSettings = true;

  constructor(private settingsService: SettingsService, private toastr: ToastrService, private location: Location,
              private activatedRoute: ActivatedRoute, private userService: UserService) {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit() {
    this.settingsForm = this.settingsService.constructSettingsForm();
    this.userService.getCurrentUserId()
      .subscribe(userId => {
        this.settingsService.getSettingsByUserId(userId)
          .subscribe(settings => {
            this.newSettings = false;
            this.populateForm(settings);
          });
      });
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.settingsForm.controls; }
  get libraryMap() { return this.ctrls.libraryMap; }
  get calibreCommand() { return this.ctrls.calibreCommand; }
  get copyTo() { return this.ctrls.copyTo }
  get mailTo() { return this.ctrls.mailTo }
  get mailHost() { return this.ctrls.mailHost }
  get mailPort() { return this.ctrls.mailPort }
  get mailUserName() { return this.ctrls.mailUserName }
  get mailPassword() { return this.ctrls.mailPassword }

  public saveSettings() {
    const settings: Settings = this.settingsForm.value as Settings;
    // post won't execute without subscribe. After calling succesfully, go back to last page
    if (this.newSettings) {
      this.settingsService.addSettings(settings)
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
      this.settingsService.updateSettings(settings)
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

  private populateForm(settings: Settings) {
    if (settings.libraryMap) {
      this.ctrls.id.setValue(settings.id);
      this.ctrls.userId.setValue(settings.userId);
      this.ctrls.libraryMap.setValue(settings.libraryMap);
      this.ctrls.calibreCommand.setValue(settings.calibreCommand);
      this.ctrls.copyTo.setValue(settings.copyTo);
      this.ctrls.mailTo.setValue(settings.mailTo);
      this.ctrls.mailHost.setValue(settings.mailHost);
      this.ctrls.mailPort.setValue(settings.mailPort);
      this.ctrls.mailUserName.setValue(settings.mailUserName);
      this.ctrls.mailPassword.setValue(settings.mailPassword);
    }
  }
}
