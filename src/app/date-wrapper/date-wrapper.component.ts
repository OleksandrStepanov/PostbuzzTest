import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-date-wrapper',
  templateUrl: './date-wrapper.component.html',
  styleUrls: ['./date-wrapper.component.scss']
})
export class DateWrapperComponent implements OnInit {
  dateFrom: any;

  constructor(private service: AppService) { }

  ngOnInit() {
  }

  changeDateType(type) {
    this.service.changeDateType(type);
  }

}
