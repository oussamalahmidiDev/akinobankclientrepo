import { Component, OnInit } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { ProfileState } from "../../states/profile.state";
import {Router} from "@angular/router";
import {TokenService} from "../../services/token.service";

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
    this.tokenService.unsetToken();
    this.router.navigate(["/"]);
    // this.userService.logout();
  }

  constructor(private router: Router, private tokenService: TokenService) {}
}
