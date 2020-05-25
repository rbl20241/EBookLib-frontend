import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';
import {AlertDialogService} from 'src/pages/alert-dialog/alert-dialog.service';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private alertDialogService: AlertDialogService) {
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
      //alert('De sessie is verlopen. Log opnieuw in!');
      this.openAlertDialog();
      this.authService.doLogout();
      this.router.navigateByUrl('/login');
    }

    return throwError(error.error.description);
  }

  public openAlertDialog() {
    console.log('openAlertDialog');
    this.alertDialogService.confirm('De sessie is verlopen.', 'Log opnieuw in!').then((confirmed) => console.log('User confirmed:', confirmed))
                                                                                    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));;
  }

}
