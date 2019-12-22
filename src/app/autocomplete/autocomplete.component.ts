import {Component, OnInit} from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  allAirports: any;
  airports: any;
  airport: any;
  originCode: any;
  destinationCode: any;
  destinationAirports: any;
  destinationAirportsCodes: any;
  airportIATA: any;
  inputType: any;
  showList: boolean = false;

  constructor(private service: AppService) { }

  ngOnInit() {
    this.service.currentDestType.subscribe(type => {
      this.inputType = type;
      this.getAllDestinations(this.inputType);
    });
    this.service.originIataCode.subscribe(code => {
      this.originCode = code;
    });
    this.service.destinationIataCode.subscribe(code => {
      this.destinationCode = code;
    });

  }

  getAllDestinations(type) {
    this.service.getAllDestinations().subscribe(
      (data) => {
        this.allAirports = data;
        if(type === 'origin') {
          this.airports = this.allAirports.airports;
        } else {
          this.airportIATA = sessionStorage.getItem('iataCodeOrigin');
          this.destinationAirportsCodes = this.allAirports.routes[this.airportIATA];
          this.destinationAirports = this.allAirports.airports.filter(airport => this.destinationAirportsCodes.indexOf(airport.iataCode) !== -1);
        }
      },
      (error) => {
      }
    );
  }

  filterAirports(value) {
    const search = value && value.toLowerCase();
    this.airports = this.allAirports.airports.filter(airport => !search || airport.name.toLowerCase().startsWith(search));
    this.showList = true;
  }
  selectAirport(airportValue) {
    if(airportValue) {
      this.airport = airportValue.name;
      this.airportIATA = airportValue.iataCode;
    }
    if(this.inputType === 'origin') {
      sessionStorage.removeItem('iataCodeOrigin');
      sessionStorage.setItem('iataCodeOrigin', this.airportIATA);
      this.service.changeOriginIata(this.airportIATA);
    }
    if(this.inputType === 'destination') {
      sessionStorage.removeItem('iataCodeDestination');
      sessionStorage.setItem('iataCodeDestination', this.airportIATA);
      this.service.changeDestinationIata(this.airportIATA);
    }
    this.showList = false;
  }

  onFocus() {
    this.airports = this.allAirports.airports;
    this.showList = true;
  }
}
