import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Settings } from '../../models/settings.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class SettingsService extends BaseService {

  public SETTINGS_URL = this.BASE_URL + '/settings';

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    super();
  }

  public getSettingsById(id: number): Observable<Settings> {
    const parms = new HttpParams().append('settingsId', String(id));
    const url = this.SETTINGS_URL + '/settingsid';
    return this.httpClient.get<Settings>( url, {params: parms, headers: this.constructHeaders()});
  }

  public constructSettingsForm(): FormGroup {
    return this.fb.group({
      id: '',
      userId: '',
      libraryMap: ['', Validators.required],
      calibreCommand: ['', Validators.required],
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

  public addSettings(settings: Settings): Observable<string> {
    return this.httpClient.post<string>(this.SETTINGS_URL, settings, {headers: this.constructHeaders()});
  }

  public getSettings() {
    return this.httpClient.get<1>(this.SETTINGS_URL, {headers: this.constructHeaders()});
  }

  public updateSettings(settings: Settings): Observable<string> {
    const url = this.SETTINGS_URL + '/update';
    return this.httpClient.put<string>(url, settings, {headers: this.constructHeaders()});
  }

  public getSettingsByUserId(id: number): Observable<Settings> {
    const parms = new HttpParams().append('userId', String(id));
    const url = this.SETTINGS_URL + '/userId';
    return this.httpClient.get<Settings>( url, {params: parms, headers: this.constructHeaders()});
  }


}
