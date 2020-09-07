import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  title = 'EBookLibrary';
  loginText: string;
  static userName: string;

  constructor(private authService: AuthService, private router: Router) {
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

  public replaceLoginText(name) {
    AppComponent.userName = name;
  }

  public logout() {
    this.authService.doLogout();
    this.router.navigateByUrl('login');
  }
}

