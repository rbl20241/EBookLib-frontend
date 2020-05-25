import { BookDetailComponent } from './book-detail.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';
import { Book } from 'src/models/book.model';
import { BookService } from 'src/shared/services/book.service';
import { ReservationService } from 'src/shared/services/reservation.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../shared/services/user.service';
import {User} from '../../models/user.model';
import {BookOwner} from '../../models/bookOwner.model';
import {ModalService} from '../../shared/services/modal.service';
import {FormBuilder} from '@angular/forms';

describe('BookDetailComponent', () => {
    let component: BookDetailComponent;
    let serviceSpy: jasmine.SpyObj<BookService>;
    let activatedRoute: ActivatedRoute;
    let locationSpy: jasmine.SpyObj<Location>;
    let routerSpy: jasmine.SpyObj<Router>;
    let reservationServiceSpy: jasmine.SpyObj<ReservationService>;
    let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
    let userServiceSpy: jasmine.SpyObj<UserService>;
    let modalServiceSpy: jasmine.SpyObj<ModalService>;

    const formBuilder: FormBuilder = new FormBuilder();

    const book: Book = new Book();
    const user = new User();
    user.id = 98765;
    const owner: BookOwner = new BookOwner();
    owner.id = 98765;
    owner.owner = user;
    const testingId = '1234';

    beforeEach(() => {
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
        locationSpy = jasmine.createSpyObj('Location', ['back']);
        reservationServiceSpy = jasmine.createSpyObj('ReservationService', ['borrowBook', 'hasBookReservationsService']);
        serviceSpy = jasmine.createSpyObj('BookService', ['getBookById', 'deleteBook']);
        userServiceSpy = jasmine.createSpyObj('UserService', ['getUserId']);
        modalServiceSpy =  jasmine.createSpyObj('ModalService', ['open', 'close']);
        toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['success']);

        book.title = 'sometestingtitle';
        book.description = 'test book';
        book.id = user.id;
        book.bookOwners = [];
        book.bookOwners.push(owner);
        serviceSpy.getBookById.and.returnValue(of(book));
        userServiceSpy.getUserId.and.returnValue(of(user.id));
        reservationServiceSpy.hasBookReservationsService.and.returnValue(of(false));

        activatedRoute = new ActivatedRoute();
        const params: Params = {id: testingId};
        activatedRoute.params = of(params);

        component = new BookDetailComponent(serviceSpy, activatedRoute,
          locationSpy, routerSpy, reservationServiceSpy, toastrServiceSpy,
          userServiceSpy, modalServiceSpy, formBuilder);
    });

    describe('ngOnInit', () => {
        it('should retrieve the bookId from the params', () => {
            component.ngOnInit();
            expect(component.bookId).toEqual(+testingId);
        });

        it('should load the book details', () => {
            component.ngOnInit();
            expect(serviceSpy.getBookById).toHaveBeenCalledWith(+testingId);
            expect(component.book).toEqual(book);
        });
    });

    describe('openConfirmModal', () => {
        it('should set the confirmdelete option to true', () => {
            component.isConfirmDeleteActive = false;
            component.openConfirmModal('id');
            expect(component.isConfirmDeleteActive).toEqual(true);
        });
    });

    describe('cancelConfirmModal', () => {
        it('should set the confirmdelete option to false', () => {
            component.isConfirmDeleteActive = true;
            component.cancelConfirmModal('id');
            expect(component.isConfirmDeleteActive).toEqual(false);
        });
    });

    describe('confirmDelete', () => {
        beforeEach(() => {
            // load the book & bookId
            component.ngOnInit();
            // return observable with empty string, response is not used
            serviceSpy.deleteBook.and.returnValue(of(''));
        });

        it('should delete the book', () => {
            component.confirmDelete();
            expect(serviceSpy.deleteBook).toHaveBeenCalledWith(owner.id);
        });

        it('should navigate back to the previous page', () => {
            component.confirmDelete();
            expect(locationSpy.back).toHaveBeenCalled();
        });
    });
});
