import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{

  static userName: string;
  title = 'EBookLibrary';
  loginText: string;

  constructor(private authService: AuthService, private router: Router) {
    this.loginText = 'Login';
  }

  ngOnInit() {
    this.loginText = 'Login';
  }

  public getLoginText(): string {
    if (this.authService.isLoggedIn()) {
      this.loginText = AppComponent.userName;
    }

    return this.loginText;
  }

  public replaceLoginText(name: string) {
    AppComponent.userName = name;
  }

  public logout() {
    this.authService.doLogout();
    this.router.navigateByUrl('auth/signin');
  }
}

