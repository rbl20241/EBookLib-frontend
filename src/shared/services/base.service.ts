import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

export class BaseService {
    public BASE_URL = environment.BASE_URL;

    constructor() {}

    public constructHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('osd:library:auth:token'));
        return headers;
    }

  public constructAddUserHeaders(): HttpHeaders {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return headers;
  }

}
