import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {
  days: number = 2;
  date: any;
  dateFrom: any;
  dateTo: any;
  dateType: any;
  @Input() typeOfDate: string;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.currentDateType.subscribe(
      (date) => {
        this.dateType = date;
      }
    );
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

  selectDate(value) {
    if(this.typeOfDate === 'dateFrom') {
      this.service.changeDateFromValue(value);
      this.service.changeDateToValue(this.add2DaysFromDate(value));
    } else {
      this.service.changeDateToValue(value);
      this.service.changeDateFromValue(this.minus2DaysFromToDate(value));
    }
  }

  add2DaysFromDate(dateFrom) {
    let dateFromToNewDate = new Date(dateFrom);
    dateFromToNewDate.setDate(dateFromToNewDate.getDate() + this.days);

    return this.formatDate(dateFromToNewDate);
  }

  minus2DaysFromToDate(dateTo) {
    let dateToNewDate = new Date(dateTo);
    dateToNewDate.setDate(dateToNewDate.getDate() - this.days);

    return this.formatDate(dateToNewDate);
  }

  formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

}
