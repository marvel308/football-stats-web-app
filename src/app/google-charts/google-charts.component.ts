import { Component, OnInit, ViewChild } from "@angular/core";

import { FetchCsvService } from "./../fetch-csv.service";

@Component({
  selector: "app-google-charts",
  templateUrl: "./google-charts.component.html",
  styleUrls: ["./google-charts.component.css"]
})
export class GoogleChartsComponent implements OnInit {
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
  title = "Goal scored per team";
  type = "LineChart";
  options = {
    hAxis: {
      title: "Date"
    },
    vAxis: {
      title: "Goals"
    },
    pointSize: 1,
    width: '100%',
  };
  width = 1250;
  height = 400;

  getData(url: string, title: string) {
    return this.fetch.getInfo(url).subscribe(data => {
      let csv_data = data
        .split("\n")
        .slice(1)
        .map(x => x.split(","));

      let dateWiseData = new Map();
      let allTeams = new Set();

      csv_data.forEach(matchpoint => allTeams.add(matchpoint[1]));
      csv_data.forEach(matchpoint => {
        if (!dateWiseData.has(matchpoint[0])) {
          dateWiseData.set(matchpoint[0], new Map());
        }
        let date_map = dateWiseData.get(matchpoint[0]);
        if (!date_map.has(matchpoint[6])) {
          date_map.set(matchpoint[6], 0);
        }
        date_map.set(matchpoint[6], date_map.get(matchpoint[6]) + 1);
      });

      let plot_data = new Map();
      let result = { data: [], columnNames: ["Date"], title: title };
      dateWiseData.forEach((date_map, date) => {
        date_map.forEach((value, team) => {
          if (!plot_data.has(team)) {
            plot_data.set(team, 0);
          }
          plot_data.set(team, plot_data.get(team) + value);
        });
        let dateData = [date];
        allTeams.forEach(team => {
          if (!plot_data.has(team)) {
            plot_data.set(team, 0);
          }
          dateData.push(plot_data.get(team));
        });
        result.data.push(dateData);
      });
      allTeams.forEach(team => result.columnNames.push(team));
      this.results.push(result);
    });
  }
}
