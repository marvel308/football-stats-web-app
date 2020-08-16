import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { GoogleChartsComponent } from '../google-charts/google-charts.component'
import { DataTableComponent } from '../data-table/data-table.component'

const routes: Routes = [
  { path: 'data', component: GoogleChartsComponent },
  { path: 'table', component: DataTableComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }