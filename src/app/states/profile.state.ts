import { State, StateContext, Action, Store, Selector } from "@ngxs/store";
import { MainStore } from "../store";
import { UserService } from "../services/user.service";
import { tap } from "rxjs/operators";
import { GetProfile } from "../actions/profile.actions";
import { Injectable } from "@angular/core";

@Injectable()
@State({
  name: "profile",
})
export class ProfileState {
  constructor(private service: UserService) {
    console.log("loading profile state...");
  }

  @Selector()
  static selectProfile(state: MainStore) {
    return state.profile;
  }

  @Action(GetProfile)
  fetchProfile(ctx: StateContext<MainStore>) {
    return this.service
      .getProfile()
      .pipe(tap((res) => ctx.patchState({ profile: res })));
  }
}
