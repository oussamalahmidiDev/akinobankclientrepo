import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { ProfileState } from "../../states/profile.state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  isLoaded = true;

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  ngOnInit() {
    // this.currentUser = this.activatedRoute.snapshot.data.profile;
  }

  logout(): void {
    // this.userService.logout();
  }

  constructor() {}
}
