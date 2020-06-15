import { Component, OnInit, OnDestroy, HostListener } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable, timer, of, Subscription, interval } from "rxjs";
import { User } from "../../models/user";
import { ProfileState } from "../../states/profile.state";
import { Router } from "@angular/router";
import { TokenService } from "../../services/token.service";
import { environment } from "../../../environments/environment";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { MainStore } from "../../store";
import { CookieService } from "../../services/cookie.service";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from "@angular/material/snack-bar";
import { NotificationComponent } from "../../components/notification/notification.component";
import { WebsocketService } from "../../services/websocket.service";
import {
  AddNotification,
  FetchNotifications,
} from "../../actions/notifications.actions";
import { FetchComptes } from "../../actions/comptes.actions";
import { GetVirements } from "../../actions/virements.action";
import { RxStompService } from "@stomp/ng2-stompjs";
import { MatDialog } from "@angular/material/dialog";
import { NotificationDrawerComponent } from "../../components/notification-drawer/notification-drawer.component";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoaded = true;

  width = window.innerWidth;

  notificationsCount = 0;

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "top";

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  timer: Observable<number>;

  MAX_TIME = 60;

  subscription: Subscription;
  websocketSubscription: Subscription;

  ngOnInit() {
    this.subscription = new Subscription();

    this.store.dispatch(new FetchNotifications()).subscribe((store) => {
      store.notifications.notifications.forEach((element) => {
        if (!element.lue) this.notificationsCount++;
      });
    });

    this.websocketService.connect();
    this.websocketSubscription = this.websocketService
      .getStomp()
      .subscribe("/user/topic/notifications")
      .subscribe((data) => {
        const notification = JSON.parse(data.body);
        this.openSnackBar(notification);
        this.notificationsCount++;
        this.store.dispatch(new AddNotification(notification));
        this.store.dispatch(new GetVirements());
        this.store.dispatch(new FetchComptes());
        console.log("Received : ", JSON.parse(data.body));
      });

    // console.log("Subscription", subscription);

    window.onblur = (e) => {
      // I disabled session auto logout in dev mode.
      if (!environment.production) return;
      // console.log("Tab/window changed", e);
      this.timer = timer(0, 1000);

      this.subscription.add(
        this.timer.subscribe((time) => {
          console.log("Timer", this.MAX_TIME - time);
          if (this.MAX_TIME - time === 0) {
            this.logout();
            alert("La session a été deconnecté à cause de l'inactivité.");
          }
        })
      );
    };

    window.onfocus = () => {
      // console.log("Tab/window focused");
      if (!environment.production) return;
      this.timer = undefined;
      if (this.subscription) this.subscription.unsubscribe();
    };
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.width = window.innerWidth;
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.tokenService.unsetToken();
      // this.store.dispatch(new ResetState());
      this.router.navigate(["/"]).then(() => {
        this.store.reset(new MainStore());
      });
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subscription) this.subscription.unsubscribe();
    window.onblur = window.onfocus = undefined;
    this.websocketSubscription.unsubscribe();
  }

  constructor(
    private router: Router,
    private tokenService: TokenService,
    private cookieService: CookieService,
    private authService: AuthService,
    private store: Store,
    private websocketService: WebsocketService,
    private snackBar: MatSnackBar, // private rxStompService: RxStompService
    private dialog: MatDialog
  ) {}

  openSnackBar(notification: Notification) {
    this.snackBar.openFromComponent(NotificationComponent, {
      data: notification,
      panelClass: "notification",
      duration: 100000000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  openNotifications() {
    const dialogRef = this.dialog.open(NotificationDrawerComponent, {
      width: "500px",
      position: { top: "30px", right: "25px" },
    });

    dialogRef.afterOpened().subscribe(() => (this.notificationsCount = 0));
  }
}
