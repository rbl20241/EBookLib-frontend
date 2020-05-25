import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {AlertDialogComponent} from 'src/dialog/alert/alert-dialog.component';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {
      },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.handleError(err);
        }
      }));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      return throwError(error.error.message);
    }

    // server-side error
    if (error.error.error === 'invalid_token') {
      // alert('Your session has expired. Please re-login');
      alertMessage();
      this.authService.doLogout();
      this.router.navigateByUrl('/login');
    }

    return throwError(error.error.description);
  }

  private alertMessage() {
    let dialogRef = this.dialog.open(AlertDialogComponent);
    dialogRef.afterClosed() subscribe(result => {});
  }

}
