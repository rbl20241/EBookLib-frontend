import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Authorization } from 'src/models/authorization.model';
import { User } from '../../models/user.model';

@Injectable()
export class AuthService extends BaseService {
    public loginStatusChanged: EventEmitter<boolean> = new EventEmitter();
    // private oauthBasicHeader = 'Basic TGlicmFyeVNoYXJpbmdBcHA6U3VwZXJTZWNyZXRQYXNzd29yZA==';

    private storageNameToken = 'osd:library:auth:token';
    private storageNameExpiryDate = 'osd:library:expired:at';

    constructor(private httpClient: HttpClient) {
        super();
        this.loginStatusChanged.emit(this.isLoggedIn());
    }

    public doLogin(user: User): void {
        this.retrieveAccessToken(user.username, user.password).subscribe(response => {
            // console.log(JSON.stringify(response));
            localStorage.setItem(this.storageNameToken, response.accessToken);
            localStorage.setItem(this.storageNameExpiryDate, Date.now() + response.tokenExpirationMsec + '');

            this.loginStatusChanged.emit(true);
        }, error => {
            console.log('Foutmelding: ' + JSON.stringify(error));
            this.loginStatusChanged.emit(false);
        });
    }

    public logout(): void {
      const url = this.BASE_URL + '/users/logout';
      this.httpClient.post<any>(url, '', {headers: this.constructJsonHeaders()});
      this.doLogout();
    }

    public doLogout(): boolean {
        localStorage.removeItem(this.storageNameToken);
        localStorage.removeItem(this.storageNameExpiryDate);
        this.loginStatusChanged.emit(false);
        return true;
    }

    public isLoggedIn(): boolean {
        if (localStorage.getItem(this.storageNameToken)) {
            if (this.isExpired(+localStorage.getItem(this.storageNameExpiryDate))) {
                // if token is expired, force a re-login by removing cached token
                this.doLogout();
                return false;
            }
            return true;
        }
        return false;
    }

    private isExpired(timestamp: number): boolean {
        return Date.now() >= timestamp;
    }

    private retrieveAccessToken(username: string, password: string): Observable<Authorization> {
       const body = JSON.stringify({username: `${username}`, password: `${password}`});
       const url = this.BASE_URL + '/auth/login';

       return this.httpClient.post<Authorization>(url, body, {headers: this.constructJsonHeaders()});
    }
}
