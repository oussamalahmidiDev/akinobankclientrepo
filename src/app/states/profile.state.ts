import { State, StateContext, Action, Store, Selector } from "@ngxs/store";
import { MainStore } from "../store";
import { UserService } from "../services/user.service";
import { tap } from "rxjs/operators";
import {
  GetProfile,
  UpdatePhoto,
  UnsetPhoto,
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
}
