import { UserService } from "../services/user.service";
import { User } from "../models/user";
import { map, tap } from "rxjs/operators";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { Store } from "@ngxs/store";
import { GetProfile } from "../actions/profile.actions";
import { TokenService } from "../services/token.service";

@Injectable({
  providedIn: "root",
})
export class ProfileServiceResolver implements Resolve<User> {
  constructor(private store: Store, private tokenService: TokenService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    this.tokenService
      .getXSRFToken()
      .subscribe(() => console.log("XSRF loaded"));
    return this.store.dispatch(new GetProfile());
  }
}
