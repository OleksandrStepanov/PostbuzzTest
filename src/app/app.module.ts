import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchWrapperComponent } from './search-wrapper/search-wrapper.component';
import { DateWrapperComponent } from './date-wrapper/date-wrapper.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { AppService } from './app.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SearchWrapperComponent,
    DateWrapperComponent,
    AutocompleteComponent,
    SearchResultsComponent,
    DateSelectorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatSortModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
