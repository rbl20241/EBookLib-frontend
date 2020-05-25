import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginForm } from 'src/pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { AuthGuardService } from './auth-guard.service';
import { HomeComponent } from '../pages/home/home.component';
import { SettingsComponent } from '../pages/settings/settings.component';
import { BooksUpdateComponent } from '../pages/books-update/update.component';

import { MyBooksComponent } from '../pages/my-books/my-books.component';
import { BookDetailComponent } from 'src/pages/book-detail/book-detail.component';
/*import { AddEditBookComponent } from 'src/pages/add-edit-book/add-edit-bBook.component'; */
import { AllBooksComponent } from 'src/pages/all-books/all-books.component';
import { BookTypeComponent } from '../pages/book-type/book-type.component';
/*
import { ReservationComponent } from 'src/pages/reservations/reservations.component';
import { ReservationDetailComponent } from 'src/pages/reservation-detail/reservation-detail.component';
*/

const routes: Routes = [
{ path: 'books', canActivate: [AuthGuardService], component: AllBooksComponent},
{ path: 'my-books', canActivate: [AuthGuardService], component: MyBooksComponent },
/*{ path: 'book/add', canActivate: [AuthGuardService], component: AddEditBookComponent }, */
/*{ path: 'book/edit/:id', canActivate: [AuthGuardService], component: AddEditBookComponent }, */
{ path: 'book/:id', canActivate: [AuthGuardService], component: BookDetailComponent},
{ path: 'login', component: LoginForm },
{ path: 'books/update', canActivate: [AuthGuardService], component: BooksUpdateComponent},
{ path: 'category/:categoryType', canActivate: [AuthGuardService], component: BookTypeComponent },
/*
{ path: 'reservations/:reservationType', canActivate: [AuthGuardService], component: ReservationComponent },
{ path: 'reservation/:id', canActivate: [AuthGuardService], component: ReservationDetailComponent},
*/
{ path: 'settings', canActivate: [AuthGuardService], component: SettingsComponent },
{ path: 'register', component: RegisterComponent },
{ path: '', canActivate: [AuthGuardService], component: HomeComponent}
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardService]
})
export class AppRoutingModule { }
