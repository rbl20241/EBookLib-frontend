import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {RegisterComponent} from './register.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';
import {RouterModule} from '@angular/router';
import {UserService} from '../../shared/services/user.service';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  // let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    // const spy = jasmine.createSpyObj('UserService', ['addUser']);

    TestBed.configureTestingModule({
      // providers: [ { provide: UserService, useValue: spy }],
      declarations: [ RegisterComponent ],
      imports: [ ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        FontAwesomeModule,
        ToastrModule.forRoot(),
        HttpClientModule,
        RouterModule.forRoot([])
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
    // userServiceSpy = TestBed.inject(UserService);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.registerForm.valid).toBeFalsy();
  });

  it('email field validity', () => {
    const email = component.registerForm.controls.email;
    expect(email.valid).toBeFalsy();

    email.setValue('wrong_address');
    expect(email.hasError('required')).toEqual(false);
    expect(email.hasError('email')).toEqual(true);

  });
});
