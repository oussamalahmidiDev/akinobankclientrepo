import { Component, OnInit, ViewChild } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { ObservableLike, Observable } from "rxjs";
import { Activity } from "../../models/activity";
import { ProfileState } from "../../states/profile.state";
import { GetActivities } from "../../actions/profile.actions";
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"],
})
export class ActivitiesComponent implements OnInit {
  @Select(ProfileState.selectActivities)
  activities: Observable<Activity[]>;

  dataSource: MatTableDataSource<Activity>;

  length = 0;

  columns = ["evenement", "category", "timestamp"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private store: Store) {
    // this.paginator.
  }

  ngOnInit(): void {
    this.store.dispatch(new GetActivities({ limit: 15, offset: 0 }));

    this.activities.subscribe((data) => {
      if (data) {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  nextPage(event: PageEvent) {
    const request = { offset: 0, limit: event.length + 10 };
    console.log(
      "Requested page",
      event,
      "Data length",
      this.dataSource.data.length,
      "Request limit",
      request.limit,
      "Pages data",
      this.dataSource.paginator.page
    );
    if (event.pageIndex > event.previousPageIndex)
      this.store.dispatch(new GetActivities(request));
  }
}
