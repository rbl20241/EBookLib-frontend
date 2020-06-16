import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Separator } from '../../shared/util/separator';
import { Format } from '../../shared/util/format';

@Injectable()
export class RenameService extends BaseService {

  public RENAME_URL = this.BASE_URL + '/rename';

  constructor(private httpClient: HttpClient, private fb: FormBuilder) {
    super();
  }

  public constructRenameForm(): FormGroup {
    return this.fb.group({
      id: '',
      sourceMap: ['', Validators.required],
      destinationMap: ['', Validators.required],
      sourceTitleAuthorSeparator: Separator,
      sourceAuthornameSeparator: Separator,
      sourceFormat: Format,
      destTitleAuthorSeparator: Separator,
      destAuthornameSeparator: Separator,
      destFormat: Format,
//       copyTo: ['', Validators.required],
//       mailTo: ['', Validators.required],
//       isDateSort: [false, Validators.required],
//       isNameSort: [true, Validators.required],
//       isEpubSelected: [true, Validators.required],
//       isMobiSelected: [true, Validators.required],
//       isPdfSelected: [true, Validators.required],
//       isCbrSelected: [true, Validators.required],
//       mailHost: ['host', Validators.required],
//       mailPort: ['port', Validators.required],
//       mailUserName: ['username', Validators.required],
//       mailPassword: ['password', Validators.required]
    });
  }

//   public addSettings(settings: Settings): Observable<string> {
//     return this.httpClient.post<string>(this.RENAME_URL, settings, {headers: this.constructHeaders()});
//   }
//
  public run() {
    console.log('run');
    return this.httpClient.get<string>(this.RENAME_URL, {headers: this.constructHeaders()});
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
