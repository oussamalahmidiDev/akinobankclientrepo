import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { Store, Select } from "@ngxs/store";
import { ObservableLike, Observable } from "rxjs";
import { Activity } from "../../models/activity";
import { ProfileState } from "../../states/profile.state";
import { GetActivities, AddActivitiy } from "../../actions/profile.actions";
import { MatTableDataSource } from "@angular/material/table";
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { tap } from "rxjs/operators";
import { WebsocketService } from "../../services/websocket.service";
import { TokenService } from "../../services/token.service";
import { CookieService } from "../../services/cookie.service";
import { RxStompRPCService, RxStompService } from "@stomp/ng2-stompjs";

@Component({
  selector: "app-activities",
  templateUrl: "./activities.component.html",
  styleUrls: ["./activities.component.css"],
})
export class ActivitiesComponent implements OnInit, OnDestroy {
  @Select(ProfileState.selectActivities)
  activities: Observable<Activity[]>;

  dataSource: MatTableDataSource<Activity>;

  length = 0;

  websocketSubscription: any;

  columns = ["evenement", "category", "timestamp"];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private store: Store,
    private websocketService: WebsocketService,
    private tokenService: TokenService,
    private cookieService: CookieService // private rx: RxStompService
  ) {
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

    this.websocketSubscription = this.websocketService
      .getStomp()
      .subscribe("/user/topic/activities")
      .subscribe((data) => {
        const activity: Activity = JSON.parse(data.body);
        this.store.dispatch(new AddActivitiy(activity));
        console.log("Received : ", activity);
      });
  }

  ngOnDestroy() {
    console.log("Disconnecting");
    this.websocketSubscription.unsubscribe();
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
