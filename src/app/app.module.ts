import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from '../pages/book-list/book-list.component';
import { BookDetailComponent } from '../pages/book-detail/book-detail.component';
import { LoginForm } from '../pages/login/login.component';
import { SettingsComponent } from 'src/pages/settings/settings.component';
import { BooksUpdateComponent } from 'src/pages/books-update/update.component';
import { AllBooksComponent } from 'src/pages/all-books/all-books.component';
import { AuthService } from 'src/shared/services/auth.service';
import { HomeComponent } from 'src/pages/home/home.component';
import { BookTypeComponent } from 'src/pages/book-type/book-type.component';
import { BookSearchComponent } from 'src/pages/book-search/book-search.component';
import { HttpErrorInterceptor } from 'src/shared/services/http-error.interceptor';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonsModule, MDBBootstrapModule} from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';
import { ModalComponent } from '../pages/modal-windows/modal-window.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { RegisterComponent } from 'src/pages/register/register.component';
import { fas } from '@fortawesome/free-solid-svg-icons';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookDetailComponent,
    LoginForm,
    SettingsComponent,
    BooksUpdateComponent,
    AllBooksComponent,
    HomeComponent,
    BookTypeComponent,
    BookSearchComponent,
    RegisterComponent,
    ModalComponent,
  ],
  imports: [
    ButtonsModule,
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    TooltipModule
  ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [AuthService, Router]
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
