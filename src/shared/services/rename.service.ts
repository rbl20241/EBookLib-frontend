import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    return this.httpClient.get<Rename>( url, {params: parms, headers: this.constructAuthHeaders()});
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

  public run(rename: Rename) {
    const url = this.RENAME_URL + '/run';
    return this.httpClient.post<string>(url, rename, {headers: this.constructAuthHeaders()});
  }

  public saveRename(rename: Rename): Observable<string> {
    const url = this.RENAME_URL + '/save';
    return this.httpClient.post<string>(url, rename, {headers: this.constructAuthHeaders()});
  }
}
