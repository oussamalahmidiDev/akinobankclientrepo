import { Component, OnInit, OnDestroy } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable, timer, of, Subscription } from "rxjs";
import { User } from "../../models/user";
import { ProfileState } from "../../states/profile.state";
import { Router } from "@angular/router";
import { TokenService } from "../../services/token.service";
import { map } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  isLoaded = true;

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  timer: Observable<number>;

  MAX_TIME = 60;

  subscription: Subscription;

  ngOnInit() {
    window.onblur = (e) => {
      // I disabled session auto logout in dev mode.
      if (!environment.production) return;
      console.log("Tab/window changed", e);
      this.timer = timer(0, 1000);
      this.subscription = new Subscription();
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
      console.log("Tab/window focused");
      this.timer = undefined;
      if (this.subscription) this.subscription.unsubscribe();
    };
  }

  logout(): void {
    this.tokenService.unsetToken();
    this.router.navigate(["/"]);
    // this.userService.logout();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.subscription) this.subscription.unsubscribe();
    window.onblur = window.onfocus = undefined;
  }

  constructor(private router: Router, private tokenService: TokenService) {}
}
