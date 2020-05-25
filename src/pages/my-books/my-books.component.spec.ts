import {MyBooksComponent} from './my-books.component';
import {Router} from '@angular/router';
import {Book} from 'src/models/book.model';
import {of} from 'rxjs';
import {BookService} from 'src/shared/services/book.service';
import {Page} from '../../models/page.model';

describe('MyBooksComponent', () => {
    let component: MyBooksComponent;
    let serviceSpy: jasmine.SpyObj<BookService>;
    let routerSpy: jasmine.SpyObj<Router>;
    let nbrBooks: number;

    let books: Book[];
    const page: Page = new Page();

    beforeEach(() => {
        serviceSpy = jasmine.createSpyObj('BookService', ['getMyBooks']);
        routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

        books = [new Book(), new Book(), new Book(), new Book()];
        nbrBooks = 4;
        page.totalElements = nbrBooks;
        page.content = books;
        serviceSpy.getMyBooks.and.returnValue(of(page));

        component = new MyBooksComponent(serviceSpy, routerSpy);
    });

    describe('ngOnInit', () => {
        it('should call loadbooks', () => {
            component.ngOnInit();
            expect(component.myBooks).toEqual(books);
            expect(component.totalNbrBooks).toEqual(nbrBooks);
        });
    });

    describe('loadBooksForPage', () => {
        it('should call the service', () => {
            component.loadBooksForPage(12);
            expect(serviceSpy.getMyBooks).toHaveBeenCalledWith(component['pageSize'], 12);
        });

        it('should load all the books', () => {
            component.loadBooksForPage(1);
            expect(component.myBooks).toEqual(books);
        });
    });

    describe('goToDetailPage', () => {
        it('should navigate to the bookURL', () => {
            component.goToDetailPage(12);
            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('book/12');
        });
    });

    describe('addNewBook', () => {
        it('should navigate to the add book page', () => {
            component.addNewBook();
            expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('book/add');
        });
    });
});
