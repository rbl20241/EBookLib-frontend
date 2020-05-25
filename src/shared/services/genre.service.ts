import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class GenreService extends BaseService {

  private genresUrl = this.BASE_URL + '/genres/';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getGenres(): Observable<string[]> {
    const url = this.genresUrl;
    return this.httpClient.get<string[]>(url, {headers: this.constructHeaders()});
  }

}
