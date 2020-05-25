import { BookListComponent } from './book-list.component';
import { Book } from '../../models/book.model';
import { Subscription } from 'rxjs';

describe('BookListComponent', () => {
    let component: BookListComponent;
    let books: Book[];
    beforeEach(() => {
        books = [ new Book(), new Book(), new Book(), new Book()];
        component = new BookListComponent();
    });

    describe('ngOnChanges', () => {
        let subscription: Subscription;

        it('should load the books if none are defined', () => {
            subscription = component.onLoadMoreBooks.subscribe(pageNum => {
                expect(pageNum).toEqual(1);
            });
            component.ngOnChanges();
        });

        it('should not load the books if they are already defined', () => {
            subscription = component.onLoadMoreBooks.subscribe(pageNum => {
                // fail if this gets executed
                expect(false).toEqual(true);
            });
            component.books = books;
            component.ngOnChanges();
        });

        afterEach(() => {
            // to prevent accidental call of fail
            subscription.unsubscribe();
        });
    });

    describe('canLoadMore', () => {
        it('should return true if books length is 10 and pageSize is 1 and nbrBooks > 10', () => {
            const tenBooks: Book[] = [];
            for (let i = 0; i < 10; i++) {
                tenBooks.push(new Book());
            }
            component.books = tenBooks;
            component.totalNbrBooks = 11;
            component.pageSize = 1;

            expect(component.canLoadMore()).toEqual(true);
        });

        it('should return false if books length is less than 10', () => {
            component.books = books;
            expect(component.canLoadMore()).toEqual(false);
        });
    });

    describe('canGoBack', () => {
        it('should return true if pagenumber is above 1', () => {
            component['pageNumber'] = 2;
            expect(component.canGoBack()).toEqual(true);
        });

        it('should return false if pagenumer is 1', () => {
            component['pageNumber'] = 1;
            expect(component.canGoBack()).toEqual(false);
        });
    });

    describe('navigate', () => {
        it('should increment the pagenumber', () => {
            component['pageNumber'] = 10;
            component.navigate(120);
            expect(component['pageNumber']).toEqual(130);
        });

        it('should decrease the pageNumber', () => {
            component['pageNumber'] = 120;
            component.navigate(-120);
            expect(component['pageNumber']).toEqual(0);
        });

        it('should reload the books', () => {
            component.onLoadMoreBooks.subscribe(pageNum => {
                expect(pageNum).toEqual(13);
            });

            component['pageNumber'] = 12;
            component.navigate(1);
        });
    });

    describe('goToDetailPage', () => {
        it('should emit the booknumber', () => {
            component.onBookClicked.subscribe(pagenum => {
                expect(pagenum).toEqual(12);
            });

            component.goToDetailPage(12);
        });
    });
});
