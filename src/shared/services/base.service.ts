import { HttpHeaders } from '@angular/common/http';
import {environment} from '../../environments/environment';

export class BaseService {
    public BASE_URL = environment.BASE_URL;

    constructor() {}

    public constructAuthHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('osd:library:auth:token'));
        return headers;
    }

    public constructAuthJsonHeaders(): HttpHeaders {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('osd:library:auth:token'));
        headers = headers.append('Content-Type', 'application/json');
        return headers;
    }

    public constructJsonHeaders(): HttpHeaders {
      let headers: HttpHeaders = new HttpHeaders();
      headers = headers.set('Content-Type', 'application/json');
      return headers;
    }

}
