import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

@Injectable()
export class UserService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getCurrentUserId(): Observable<number> {
    const url = this.BASE_URL + '/users/currentuserid';
    return this.httpClient.get<number>(url, {headers: this.constructAuthHeaders()});
  }

  public addUser(user: User): Observable<string> {
//     const url = `/users`;
//     return this.httpClient.post<string>(this.BASE_URL + url, user, {headers: this.constructAddUserHeaders()});
    const body = JSON.stringify({
      username: `${user.username}`,
      email: `${user.email}`,
      password: `${user.password}`
    });
    const url = `/auth/signup`;
    return this.httpClient.post<string>(this.BASE_URL + url, body, {headers: this.constructJsonHeaders()});
  }

  public getCurrentUser(): Observable<User> {
    const url = `/users/currentuser`;
    return this.httpClient.get<User>(this.BASE_URL + url, {headers: this.constructAuthHeaders()});
  }



}
