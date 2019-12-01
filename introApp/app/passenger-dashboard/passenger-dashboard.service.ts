import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

import { Passenger } from './models/passenger.interface';

@Injectable()
export class PassengerDashboardService {
  private passengerApi: string;

  constructor(private http: Http) {
    this.passengerApi = '/api/passengers';
  }

  getPassengers = (): Observable<Passenger[]> => {
    return this.http
      .get(this.passengerApi)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  };

  updatePassengers = (passenger: Passenger): Observable<Passenger> => {
    return this.http
      .put(`${this.passengerApi}/${passenger.id}`, passenger)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  };

  deletePassengers = (passenger: Passenger): Observable<Passenger> => {
    return this.http
      .delete(`${this.passengerApi}/${passenger.id}`)
      .map((response: Response) => response.json())
      .catch((error: any) => Observable.throw(error.json()));
  };
}
