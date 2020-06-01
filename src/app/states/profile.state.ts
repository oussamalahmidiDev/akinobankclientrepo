import { State, StateContext, Action, Store, Selector } from "@ngxs/store";
import { MainStore } from "../store";
import { UserService } from "../services/user.service";
import { tap } from "rxjs/operators";
import {
  GetProfile,
  UpdatePhoto,
  UnsetPhoto,
  UpdateProfile,
  Set2FAOn,
} from "../actions/profile.actions";
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

  @Action(UpdatePhoto)
  updatePhoto(ctx: StateContext<MainStore>, { url }: UpdatePhoto) {
    return ctx.patchState({
      profile: { ...ctx.getState().profile, photo: url },
    });
  }

  @Action(UnsetPhoto)
  unsetPhoto(ctx: StateContext<MainStore>) {
    return this.service.deletePhoto().pipe(
      tap(() =>
        ctx.patchState({
          profile: { ...ctx.getState().profile, photo: null },
        })
      )
    );
    // return ctx.patchState({
    //   profile: { ...ctx.getState().profile, photo: null },
    // });
  }

  @Action(Set2FAOn)
  set2FAOn(ctx: StateContext<MainStore>) {
    ctx.patchState({
      profile: { ...ctx.getState().profile, _2FaEnabled: true },
    });
  }

  @Action(UpdateProfile)
  updateProfile(ctx: StateContext<MainStore>, { payload }: UpdateProfile) {
    return this.service
      .updateProfile(payload)
      .pipe(tap((res) => ctx.patchState({ profile: res })));
  }
}
