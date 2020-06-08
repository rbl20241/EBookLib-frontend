import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import { Router } from '@angular/router';
import {RegisterService} from './register.service';
import {User} from '../../models/user.model';
import {Location} from '@angular/common';
import {UserService} from '../../shared/services/user.service';
import {ToastrService} from 'ngx-toastr';
import {take} from 'rxjs/operators';

@Component({
  selector: 'register',
  providers: [RegisterService, UserService],
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  errorMessage: string;
  registerForm: FormGroup;

  constructor(private registerService: RegisterService, private userService: UserService,
              private toastr: ToastrService, private router: Router, private location: Location) {
  }

  ngOnInit() {
    this.registerForm = this.registerService.constructRegisterForm();
  }

  // convenience getters for easy access to form fields
  get ctrls() { return this.registerForm.controls; }
  get email() { return this.ctrls.email; }
  get username() { return this.ctrls.username; }
  get password() { return this.ctrls.password }

  public doRegister() {
    const user: User = this.registerForm.value as User;
    // post won't execute without subscribe. After calling succesfully, go back to last page
    this.userService.addUser(user)
      .pipe(take(1))
      .subscribe(
      response => {
        this.showToaster();
        this.location.back();
    },
    error => {
        this.errorMessage = error.error.message;
        this.username.setErrors({inuse: true});
      }
    );
  }

  cancel() {
    this.location.back();
  }

  private showToaster() {
      this.toastr.success('Registration successful');
  }
}
