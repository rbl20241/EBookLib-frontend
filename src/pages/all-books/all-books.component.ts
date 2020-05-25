import { Component, OnInit } from '@angular/core';
import { Book } from 'src/models/book.model';
import { BookService } from 'src/shared/services/book.service';
import { Router } from '@angular/router';

@Component({
    selector: 'all-books',
    templateUrl: 'all-books.component.html',
    providers: [BookService]
})
export class AllBooksComponent implements OnInit {

    allBooks: Book[];
    totalNbrBooks: number;
    pageSize = 10;

    constructor(private bookService: BookService, private router: Router) { }

    ngOnInit() {
        this.loadBooksForPage(1);
    }

    public loadBooksForPage(pageNum: number) {
        this.bookService.getAllBooks(this.pageSize, pageNum).subscribe(page => {
            this.allBooks = page.content;
            this.totalNbrBooks = page.totalElements;
        });
    }

    public goToDetailPage(bookId: number) {
        // navigate to detailpage
        this.router.navigateByUrl(`book/${bookId}`);
    }
}
