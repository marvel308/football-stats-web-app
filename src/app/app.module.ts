import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { GoogleChartsModule } from "angular-google-charts";
import { GoogleChartsComponent } from "./google-charts/google-charts.component";
import { HttpClientModule } from "@angular/common/http";
import { FetchCsvService } from './fetch-csv.service';
import { ScriptLoaderService } from 'angular-google-charts';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { DataTableComponent } from './data-table/data-table.component';

@NgModule({
  imports: [AppRoutingModule, BrowserModule, FormsModule, GoogleChartsModule, HttpClientModule],
  declarations: [
    AppComponent,
    GoogleChartsComponent,
    DataTableComponent,
  ],
  bootstrap: [AppComponent],
  providers: [FetchCsvService, ScriptLoaderService]
})
export class AppModule {}
