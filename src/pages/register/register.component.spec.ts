import {FormBuilder, FormGroup} from '@angular/forms';
import {Location} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../shared/services/user.service';
import {RegisterComponent} from './register.component';
import {RegisterService} from './register.service';
import {of} from 'rxjs';
import {User} from '../../models/user.model';

describe('Component: Register', () => {
    let component: RegisterComponent;

    let registerServiceSpy: jasmine.SpyObj<RegisterService>;
    let userServiceSpy: jasmine.SpyObj<UserService>;
    let locationSpy: jasmine.SpyObj<Location>;
    let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

    const formBuilder: FormBuilder = new FormBuilder();
    let formGroup: FormGroup;

    beforeEach(() => {
        registerServiceSpy = jasmine.createSpyObj('RegisterService', ['constructRegisterForm']);
        userServiceSpy = jasmine.createSpyObj('UserService', ['addUser']);
        locationSpy = jasmine.createSpyObj('Location', ['back']);
        toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);

        formGroup = formBuilder.group({
          id: '',
          firstName: [''],
          lastName: [''],
          email: [''],
          password: [''],
          confirmPassword: ['']
        });
        registerServiceSpy.constructRegisterForm.and.returnValue(formGroup);

        // create the component
        component = new RegisterComponent(registerServiceSpy, userServiceSpy, toastrServiceSpy, locationSpy);
    });

    describe('ngOnInit', () => {
        it('should retrieve the FormGroup of the service', () => {
            component.ngOnInit();
            expect(registerServiceSpy.constructRegisterForm).toHaveBeenCalled();
            expect(component.registerForm).toEqual(formGroup);
        });
    });

    describe('register', () => {

        beforeEach(() => {
            // return an observable with a string return type
            userServiceSpy.addUser.and.returnValue(of(''));

            formGroup.controls.firstName.setValue('bob');
            formGroup.controls.lastName.setValue('de bouwer');
            formGroup.controls.email.setValue('bob.de.bouwer@ordina.nl');
            formGroup.controls.password.setValue('secret');
            formGroup.controls.confirmPassword.setValue('secret');

            // load the variables
            component.ngOnInit();
        });

        it('should call addBook with the formvalues', () => {
            const user: User = formGroup.value as User;

            component.doRegister();
            expect(userServiceSpy.addUser).toHaveBeenCalledWith(user);
        });

        it('should go back to the previous page after adding a book', () => {
            component.doRegister();
            expect(locationSpy.back).toHaveBeenCalled();
        });
    });
});
