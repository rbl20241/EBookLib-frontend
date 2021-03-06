import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginForm } from 'src/pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from '../pages/home/home.component';
import { UserSettingsComponent } from '../pages/usersettings/usersettings.component';
import { MainSettingsComponent } from '../pages/mainsettings/mainsettings.component';
import { RenameComponent } from '../pages/rename/rename.component';
import { BooksUpdateComponent } from '../pages/books-update/update.component';

import { BookDetailComponent } from 'src/pages/book-detail/book-detail.component';
import { AllBooksComponent } from 'src/pages/all-books/all-books.component';
import { BookTypeComponent } from '../pages/book-type/book-type.component';
import { BookSearchComponent } from '../pages/book-search/book-search.component';

const routes: Routes = [
{ path: 'books', canActivate: [AuthGuardService], component: AllBooksComponent},
{ path: 'book/:id', canActivate: [AuthGuardService], component: BookDetailComponent},
{ path: 'login', component: LoginForm },
{ path: 'books/update', canActivate: [AuthGuardService], component: BooksUpdateComponent},
{ path: 'genre/:genreType', canActivate: [AuthGuardService], component: BookTypeComponent },
{ path: 'search/:whatToSearch/:query/:genre/:category/:extension/:language', canActivate: [AuthGuardService], component: BookSearchComponent },
{ path: 'usersettings', canActivate: [AuthGuardService], component: UserSettingsComponent },
{ path: 'mainsettings', canActivate: [AuthGuardService], component: MainSettingsComponent },
{ path: 'rename', canActivate: [AuthGuardService], component: RenameComponent },
{ path: 'register', component: RegisterComponent },
{ path: '', canActivate: [AuthGuardService], component: HomeComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
