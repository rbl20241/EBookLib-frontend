import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ImageService {

  private booksUrl = 'http://localhost:4200/book';

  constructor(private httpClient: HttpClient) {
  }

  public uploadImage(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    const url = this.booksUrl + '/cover-image';

    console.log('url image -> ' + url);
    return this.httpClient.post(url, formData);
  }
}
