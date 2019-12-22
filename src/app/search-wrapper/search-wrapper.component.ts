import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-search-wrapper',
  templateUrl: './search-wrapper.component.html',
  styleUrls: ['./search-wrapper.component.scss']
})
export class SearchWrapperComponent implements OnInit {
  originCode: string;
  destinationCode: string;
  changeDirection: boolean = false;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.originIataCode.subscribe(code => {
      this.originCode = code;
    });
    this.service.destinationIataCode.subscribe(code => {
      this.destinationCode = code;
    });
  }

  changeDestinationType(type) {
    this.service.changeDestType(type);
  }
}
