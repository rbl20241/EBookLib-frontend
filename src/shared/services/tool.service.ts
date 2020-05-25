import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ToolService extends BaseService {

  public TOOL_URL = this.BASE_URL + '/tool';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public openCalibre(bookId: number): Observable<string> {
    const parms = new HttpParams().append('bookId', String(bookId));
    const url = this.TOOL_URL + '/calibre';
    console.log('calibre - tool.service.ts (' + url + ')');

    return this.httpClient.get<string>( url, {params: parms, headers: this.constructHeaders()});
  }



}

