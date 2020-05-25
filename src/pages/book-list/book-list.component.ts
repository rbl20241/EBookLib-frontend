import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Book } from '../../models/book.model';

@Component({
    selector: 'book-list',
    templateUrl: 'book-list.component.html',
    styleUrls: ['book-list.component.scss']
})
export class BookListComponent implements OnChanges {
    @Input()
    books: Book[];

    @Input()
    totalNbrBooks: number;

    @Input()
    pageSize: number;

    @Output()
    onLoadMoreBooks: EventEmitter<number> = new EventEmitter();

    @Output()
    onBookClicked: EventEmitter<number> = new EventEmitter();

//     @Output()
//     onDeleteBookClicked: EventEmitter<number> = new EventEmitter();

    private pageNumber = 1;

    constructor() { }

    public ngOnChanges() {
        // if a component fails to define input params, ask for new books
        if (!this.books) {
            this.loadBooks();
        }
    }

    public canLoadMore(): boolean {
        return this.totalNbrBooks > ((this.pageNumber - 1) * this.pageSize) + this.books.length;
    }

    public canGoBack(): boolean {
        return this.pageNumber > 1;
    }

    public navigate(numberOfPages: number) {
        this.pageNumber += numberOfPages;
        this.loadBooks();
    }

    public goToDetailPage(bookId: number) {
        // notify the parent that a book has been selected
        this.onBookClicked.emit(bookId);
    }

    private loadBooks() {
        // notify the parent component to load more books
        this.onLoadMoreBooks.emit(this.pageNumber);
    }

    public descriptionFound(description): boolean {
      return !description.startsWith("Helaas geen beschrijving");
    }

    public shortenDescription(description) {
      if (description.length > 250) {
        return description.substring(0, 250).concat('...');
      } else {
        return description;
      }

    }
}
