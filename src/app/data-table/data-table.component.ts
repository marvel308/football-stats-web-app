import { Component, OnInit } from "@angular/core";
import { FetchCsvService } from "./../fetch-csv.service";

@Component({
  selector: "app-data-table",
  templateUrl: "./data-table.component.html",
  styleUrls: ["./data-table.component.css"]
})
export class DataTableComponent implements OnInit {
  constructor(private fetch: FetchCsvService) {}

  results = [];
  async ngOnInit() {
    await this.getData(
      "https://marvel308.github.io/data.csv",
      "Goal scored per team"
    );
    await this.getData(
      "https://marvel308.github.io/critical_data.csv",
      "Critical goal scored per team"
    );
  }

  type = "Table";
  options = {
    alternatingRowStyle: true,
    showRowNumber: true,
    page: "enable",
    pageSize: 10
  };

  getData(url: string, title: string) {
    return this.fetch.getInfo(url).subscribe(data => {
      let csv_data = data.split("\n");
      let csv_values = csv_data.splice(1);
      this.results.push({
        data: csv_values.map(x => x.split(',')),
        columnNames: csv_data[0].split(','),
        title: title
      });
    });
  }
}
