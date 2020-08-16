import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";

@Injectable()
export class FetchCsvService {

  columnNames = [];
  data = [];

  constructor(private http: HttpClient) {}

  getInfo(url:string) {
    return this.http.get(url, { responseType: "text" });
  }
}