import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MainSettings } from '../../models/mainsettings.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class MainSettingsService extends BaseService {

  public MAINSETTINGS_URL = this.BASE_URL + '/mainsettings';

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    super();
  }

  public constructMainSettingsForm(): FormGroup {
    return this.fb.group({
      id: '',
      libraryMap: ['', Validators.required],
      calibreCommand: ['', Validators.required]
    });
  }

  public saveMainSettings(mainSettings: MainSettings): Observable<string> {
    return this.httpClient.post<string>(this.MAINSETTINGS_URL, mainSettings, {headers: this.constructAuthHeaders()});
  }

  public getMainSettings(): Observable<MainSettings> {
    return this.httpClient.get<MainSettings>(this.MAINSETTINGS_URL, {headers: this.constructAuthHeaders()});
  }

  public updateMainSettings(mainSettings: MainSettings): Observable<string> {
    const url = this.MAINSETTINGS_URL + '/update';
    return this.httpClient.put<string>(url, mainSettings, {headers: this.constructAuthHeaders()});
  }
}
