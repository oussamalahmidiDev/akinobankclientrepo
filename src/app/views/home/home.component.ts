import { Component, OnInit } from "@angular/core";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment";
import { UserService } from "../../services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { MainStore } from "../../store";
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

  constructor(private activatedRoute: ActivatedRoute) {}
}
