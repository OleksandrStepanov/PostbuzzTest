import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {ActivatedRoute} from '@angular/router';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  queryParams: any;
  searchResults: any;
  sortedData: any;

  constructor(private service: AppService, private route: ActivatedRoute) {
    this.route.snapshot.paramMap.get('from');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.queryParams = params;
      this.getAllFlights(this.queryParams.origin, this.queryParams.destination, this.queryParams.from, this.queryParams.to);
    });
  }

  getAllFlights(origin, destination, from, to) {
    this.service.getAllCheapestFlights(origin, destination, from, to).subscribe(
      (data) => {
        this.searchResults = data;
        this.sortedData = this.searchResults.flights.slice();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  sortData(sort: Sort) {
    const data = this.searchResults.flights.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'price': return this.compare(a.price, b.price, isAsc);
        case 'dateFrom': return this.compare(a.dateFrom, b.dateFrom, isAsc);
        case 'dateTo': return this.compare(a.dateTo, b.dateTo, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

}
