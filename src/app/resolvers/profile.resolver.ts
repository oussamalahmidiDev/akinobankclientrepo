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

@Injectable({
  providedIn: "root",
})
export class ProfileServiceResolver implements Resolve<User> {
  constructor(private store: Store) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> {
    return this.store.dispatch(new GetProfile());
  }
}
