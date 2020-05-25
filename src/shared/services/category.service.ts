import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CategoryService extends BaseService {

  private categoriesUrl = this.BASE_URL + '/categories/';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getCategories(): Observable<string[]> {
    const url = this.categoriesUrl;
    return this.httpClient.get<string[]>(url, {headers: this.constructHeaders()});
  }

}
