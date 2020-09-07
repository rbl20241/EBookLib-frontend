import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserSettings } from '../../models/usersettings.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class UserSettingsService extends BaseService {

  public USERSETTINGS_URL = this.BASE_URL + '/usersettings';

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    super();
  }

  public getSettingsById(id: number): Observable<UserSettings> {
    const parms = new HttpParams().append('usersettingsId', String(id));
    const url = this.USERSETTINGS_URL + '/usersettingsid';
    return this.httpClient.get<UserSettings>( url, {params: parms, headers: this.constructAuthHeaders()});
  }

  public constructUserSettingsForm(): FormGroup {
    return this.fb.group({
      id: '',
      userId: '',
      copyTo: ['', Validators.required],
      mailTo: ['', Validators.required],
      isDateSort: [false, Validators.required],
      isNameSort: [true, Validators.required],
      isEpubSelected: [true, Validators.required],
      isMobiSelected: [true, Validators.required],
      isPdfSelected: [true, Validators.required],
      isCbrSelected: [true, Validators.required],
      mailHost: ['host', Validators.required],
      mailPort: ['port', Validators.required],
      mailUserName: ['username', Validators.required],
      mailPassword: ['password', Validators.required]
    });
  }

  public addUserSettings(userSettings: UserSettings): Observable<string> {
    return this.httpClient.post<string>(this.USERSETTINGS_URL, userSettings, {headers: this.constructAuthHeaders()});
  }

  public getUserSettings() {
    return this.httpClient.get<1>(this.USERSETTINGS_URL, {headers: this.constructAuthHeaders()});
  }

  public updateUserSettings(userSettings: UserSettings): Observable<string> {
    const url = this.USERSETTINGS_URL + '/update';
    return this.httpClient.put<string>(url, userSettings, {headers: this.constructAuthHeaders()});
  }

  public getUserSettingsByUserId(id: number): Observable<UserSettings> {
    const parms = new HttpParams().append('userId', String(id));
    const url = this.USERSETTINGS_URL + '/userId';
    return this.httpClient.get<UserSettings>( url, {params: parms, headers: this.constructAuthHeaders()});
  }


}
