import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';


export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap({
      next: () => {},
      error: (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.handleError(err);
        }
      }}));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(() => new Error(error.error.message));
    }

    // server-side error
    if (error.error.error === 'invalid_token') {
      alert('De sessie is verlopen. Log opnieuw in!');
      this.authService.doLogout();
      this.router.navigateByUrl('/auth/signin');
    }

    return throwError(error.error.description);
  }


}
