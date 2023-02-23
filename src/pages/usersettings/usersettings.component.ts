import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../shared/services/user.service';
import {UserSettingsService} from '../../shared/services/usersettings.service';
import {UserSettings} from '../../models/usersettings.model';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {take, takeUntil} from 'rxjs/operators';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'usersettings',
  providers: [UserSettingsService, UserService],
  templateUrl: 'usersettings.component.html',
  styleUrls: ['usersettings.component.scss']
})
export class UserSettingsComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject();
  errorMessage: string;
  userSettingsForm: FormGroup;
  newSettings = true;
  visiblePassword = false;

  constructor(private userSettingsService: UserSettingsService, private toastr: ToastrService, private location: Location,
              private activatedRoute: ActivatedRoute, private userService: UserService) {

    this.errorMessage = '';
    this.userSettingsForm = FormGroup.prototype;
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  ngOnInit() {
    this.userSettingsForm = this.userSettingsService.constructUserSettingsForm();
    this.userService.getCurrentUserId()
      .subscribe(userId => {
        this.userSettingsService.getUserSettingsByUserId(userId)
          .subscribe(userSettings => {
            this.newSettings = false;
            this.populateForm(userSettings);
          });
      });
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.userSettingsForm.controls; }
  get copyTo() { return this.ctrls.copyTo; }
  get mailTo() { return this.ctrls.mailTo; }
  get mailHost() { return this.ctrls.mailHost; }
  get mailPort() { return this.ctrls.mailPort; }
  get mailUserName() { return this.ctrls.mailUserName; }
  get mailPassword() { return this.ctrls.mailPassword; }

  public saveUserSettings() {
    const userSettings: UserSettings = this.userSettingsForm.value as UserSettings;
    // post won't execute without subscribe. After calling succesfully, go back to last page
    if (this.newSettings) {
      this.userSettingsService.addUserSettings(userSettings)
        .pipe(take(1))
        .subscribe({
          next: response => {
            this.showToaster();
            this.location.back();
          },
          error: error => {
            console.log(error);
            this.errorMessage = error.message;
          }
        });
    }
    else {
      this.userSettingsService.updateUserSettings(userSettings)
        .pipe(take(1))
        .subscribe({
          next: response => {
            this.showToaster();
            this.location.back();
          },
          error: error => {
            console.log(error);
            this.errorMessage = error.message;
          }
        });
    }
  }

  cancel() {
    this.location.back();
  }

  showPassword() {
    this.visiblePassword = true;
  }

  hidePassword() {
    this.visiblePassword = false;
  }

  private showToaster() {
      this.toastr.success('Instellingen opgeslagen');
  }

  private populateForm(userSettings: UserSettings) {
    if (userSettings.id) {
      this.ctrls.id.setValue(userSettings.id);
      this.ctrls.userId.setValue(userSettings.userId);
      this.ctrls.copyTo.setValue(userSettings.copyTo);
      this.ctrls.mailTo.setValue(userSettings.mailTo);
      this.ctrls.mailHost.setValue(userSettings.mailHost);
      this.ctrls.mailPort.setValue(userSettings.mailPort);
      this.ctrls.mailUserName.setValue(userSettings.mailUserName);
      this.ctrls.mailPassword.setValue(userSettings.mailPassword);
    }
  }
}
