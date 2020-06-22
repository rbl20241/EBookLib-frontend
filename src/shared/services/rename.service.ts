import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Separator } from '../../models/separator.model';
import { Format } from '../../models/format.model';
import { Rename } from '../../models/rename.model';

@Injectable()
export class RenameService extends BaseService {

  public RENAME_URL = this.BASE_URL + '/rename';

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    super();
  }

  public getRenameByUserId(id: number): Observable<Rename> {
    const parms = new HttpParams().append('userId', String(id));
    const url = this.RENAME_URL + '/userId';
    return this.httpClient.get<Rename>( url, {params: parms, headers: this.constructHeaders()});
  }

  public getStandardValues(id: number): Observable<Rename> {
    const parms = new HttpParams().append('userId', String(id));
    const url = this.RENAME_URL + '/standard';
    return this.httpClient.get<Rename>( url, {params: parms, headers: this.constructHeaders()});
  }

  public constructRenameForm(): FormGroup {
    return this.fb.group({
      id: '',
      userId: '',
      sourceMap: ['', Validators.required],
      sourceTitleAuthorSeparator: '',
      sourceAuthornameSeparator: '',
      sourceFormat: '',
      destMap: ['', Validators.required],
      destTitleAuthorSeparator: '',
      destAuthornameSeparator: '',
      destFormat: ''
    });
  }

  public init() {
    return this.httpClient.post<string>(this.RENAME_URL, null, {headers: this.constructHeaders()});
  }

  public run() {
    const url = this.RENAME_URL + '/run';
    return this.httpClient.get<string>(url, {headers: this.constructHeaders()});
  }

  public getAllSeparators(): Observable<Separator[]> {
    const url = this.RENAME_URL + '/separators';
    return this.httpClient.get<Separator[]>(url, {headers: this.constructHeaders()});
  }

  public getSeparatorByName(name: string): Observable<Separator> {
    const parms = new HttpParams().append('name', name);
    const url = this.RENAME_URL + '/separator/';
    return this.httpClient.get<Separator>(url, {params: parms, headers: this.constructHeaders()});
  }

  public getAllFormats(): Observable<Format[]> {
    const url = this.RENAME_URL + '/formats';
    return this.httpClient.get<Format[]>(url, {headers: this.constructHeaders()});
  }

  public addRename(rename: Rename): Observable<string> {
    const url = this.RENAME_URL + '/create';
    return this.httpClient.post<string>(url, rename, {headers: this.constructHeaders()});
  }

  public updateRename(rename: Rename): Observable<string> {
    const url = this.RENAME_URL + '/update';
    return this.httpClient.put<string>(url, rename, {headers: this.constructHeaders()});
  }




//   public updateSettings(settings: Settings): Observable<string> {
//     const url = this.RENAME_URL + '/update';
//     return this.httpClient.put<string>(url, settings, {headers: this.constructHeaders()});
//   }
//
//   public getSettingsByUserId(id: number): Observable<Settings> {
//     const parms = new HttpParams().append('userId', String(id));
//     const url = this.RENAME_URL + '/userId';
//     return this.httpClient.get<Settings>( url, {params: parms, headers: this.constructHeaders()});
//   }


}
