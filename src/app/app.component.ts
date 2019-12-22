import {Component, OnInit} from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'test-Postbuzz';
  dateFrom: any;
  dateTo: any;

  constructor(private service: AppService, private router: Router) { }

  ngOnInit() {
    this.service.actualDateFrom.subscribe(
      (date) => {
        this.dateFrom = date;
      }
    );
    this.service.actualDateTo.subscribe(
      (date) => {
        this.dateTo = date;
      }
    );
  }

  searchFlights() {
    this.router.navigate(['flights'], { queryParams: { from: this.dateFrom, to: this.dateTo, origin: sessionStorage.getItem('iataCodeOrigin'), destination: sessionStorage.getItem('iataCodeDestination')}});
  }


}
