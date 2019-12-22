import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class AppService {
  public destinationType = new BehaviorSubject<string>('origin');
  currentDestType = this.destinationType.asObservable();
  public dateType = new BehaviorSubject<string>('dateFrom');
  currentDateType = this.dateType.asObservable();
  public dateFromValue = new BehaviorSubject<string>('');
  actualDateFrom = this.dateFromValue.asObservable();
  public dateToValue = new BehaviorSubject<string>('');
  actualDateTo = this.dateToValue.asObservable();
  public originIata = new BehaviorSubject<string>('');
  originIataCode = this.originIata.asObservable();
  public destinationIata = new BehaviorSubject<string>('');
  destinationIataCode = this.destinationIata.asObservable();

  constructor(
    private http: HttpClient,
  ) {}

  changeDestType(currentType: string) {
    this.destinationType.next(currentType);
  }

  changeOriginIata(origin: string) {
    this.originIata.next(origin);
  }

  changeDestinationIata(destination: string) {
    this.destinationIata.next(destination);
  }

  changeDateType(dateType: string) {
    this.dateType.next(dateType);
  }

  changeDateFromValue(dateFrom: string) {
    this.dateFromValue.next(dateFrom);
  }

  changeDateToValue(dateTo: string) {
    this.dateToValue.next(dateTo);
  }

  getAllDestinations() {
    let url = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/forms/flight-booking-selector/',
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    return this.http.get(url, { headers: headers });
  }

  getAllCheapestFlights(origin, destination, from, to) {
    let url = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/' + origin + '/to/' + destination + '/' + from + '/' + to + '/250/unique/?limit=15&offset-0',
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    return this.http.get(url, { headers: headers });
  }

}

