import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterService} from './register.service';
import {User} from '../../models/user.model';
import {Location} from '@angular/common';
import { AuthService } from 'src/shared/services/auth.service';
import {UserService} from '../../shared/services/user.service';
import { AppComponent } from 'src/app/app.component';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';

@Component({
  selector: 'register',
  providers: [RegisterService, UserService, AppComponent],
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;
  errMessage = false;
  registerForm: FormGroup;

  constructor(private registerService: RegisterService, private userService: UserService,
              private authService: AuthService, private toastr: ToastrService, private router: Router,
              private location: Location, private appComponent: AppComponent) {

    this.errorMessage = '';
    this.registerForm = FormGroup.prototype;
  }

  ngOnInit() {
    this.registerForm = this.registerService.constructRegisterForm();
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.registerForm.controls; }
  get email() { return this.ctrls.email; }
  get username() { return this.ctrls.username; }
  get password() { return this.ctrls.password; }

  public doRegister() {
    const user: User = this.registerForm.value as User;
    // post won't execute without subscribe. After calling succesfully, go back to last page
    this.userService.addUser(user)
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.showToaster();
          this.login(user);
        },
        error: error => {
          this.errorMessage = error.error.message;
          this.username.setErrors({inuse: true});
        }
      });
  }

  cancel() {
    this.location.back();
  }

  private showToaster() {
      this.toastr.success('Registration successful');
  }

  login(user: User) {
    this.authService.doLogin(user);
    this.authService
     .loginStatusChanged
     .pipe(take(1))
     .subscribe(loggedIn => {
      if (loggedIn) {
          this.appComponent.replaceLoginText(user.username);
          this.router.navigateByUrl('/usersettings');
      } else {
        this.errMessage = true;
      }
    });
  }

}
