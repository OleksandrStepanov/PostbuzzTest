import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';


const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '',
    children: [
      {
        path: 'flights',
        component: SearchResultsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
