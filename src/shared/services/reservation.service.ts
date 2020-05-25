import {Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs';
import {Reservation} from 'src/models/reservation.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BookOwner} from '../../models/bookOwner.model';
import {User} from '../../models/user.model';

@Injectable()
export class ReservationService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public borrowBook(ownerId: number): Observable<string> {
    const url = `/reservations`;
    const owner: User = new User();
    owner.id = ownerId;
    const reservationObj: Reservation = new Reservation();
    reservationObj.owner = owner;
    return this.httpClient.post<string>(this.BASE_URL + url, reservationObj, {headers: this.constructHeaders()});
  }

  public getReservationsOfMyBooks(): Observable<Reservation[]> {
    const url = `/reservations/reservations-of-my-books`;
    return this.httpClient.get<Reservation[]>(this.BASE_URL + url, {headers: this.constructHeaders()});
  }

  public getReservationsIMade(): Observable<Reservation[]> {
    const url = `/reservations/my-reservations`;
    return this.httpClient.get<Reservation[]>(this.BASE_URL + url, {headers: this.constructHeaders()});
  }

  public reservationAction(actionType: string, reservationId: number, declineReason: string): Observable<Reservation> {
    const url = `/reservations/update`;
    const reservationObj: Reservation = new Reservation();
    reservationObj.id = reservationId;
    reservationObj.status = actionType;
    reservationObj.declineReason = declineReason;
    return this.httpClient.put<Reservation>(this.BASE_URL + url, reservationObj, {headers: this.constructHeaders()});
  }

  public getReserverdBookDetails(reservationId: number): Observable<Reservation> {
    const url = `/reservations/${reservationId}`;
    return this.httpClient.get<Reservation>(this.BASE_URL + url, {headers: this.constructHeaders()});
  }

  public hasBookReservationsService(bookOwnerId: number): Observable<boolean> {
    const parms = new HttpParams().append('bookOwnerId', String(bookOwnerId));
    const url = `/reservations/hasBookReservations`;
    return this.httpClient.get<boolean>(this.BASE_URL + url, {params: parms, headers: this.constructHeaders()});
  }

}
