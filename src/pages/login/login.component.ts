import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {LoginService} from './login.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth.service';
import { UserService } from 'src/shared/services/user.service';
import { AppComponent } from 'src/app/app.component';
import {take} from 'rxjs/operators';
import {User} from '../../models/user.model';

@Component({
    selector: 'login-form',
    providers: [LoginService, UserService, AppComponent],
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginForm implements OnInit {
    loginForm: FormGroup;
    errMessage = false;

    constructor(private loginService: LoginService, private userService: UserService, private authService: AuthService,
                              private router: Router, private appComponent: AppComponent) { }

  ngOnInit() {
    this.loginForm = this.loginService.constructLoginForm();
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.loginForm.controls; }
  get username() { return this.ctrls.username; }
  get password() { return this.ctrls.password }

/*
    ngAfterViewInit() {
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        //scriptElement.src = 'assets/js/login-form.js';
        this.elementRef.nativeElement.appendChild(scriptElement);
    }
 */

  /**
   * When we press login a next time the observable will be created again while the previous one will still exist.
   * When we navigate to the next screen the component will get destroyed but the subscription will live on
   * e.g. a memory leak is introduced.
   * The RxJS take(1) operator automatically unsubscribes after the first execution.
   */
  login() {
    const user: User = this.loginForm.value as User;
    this.authService.doLogin(user);
    this.authService
     .loginStatusChanged
     .pipe(take(1))
     .subscribe(loggedIn => {
      if (loggedIn) {
          this.appComponent.replaceLoginText(user.username);
          this.router.navigateByUrl('/');
      } else {
        this.errMessage = true;
      }
    });
  }
}
