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
  GetActivities,
  AddActivitiy,
} from "../actions/profile.actions";
import { Injectable } from "@angular/core";
import { patch, insertItem } from "@ngxs/store/operators";

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

  @Selector()
  static selectActivities(state: MainStore) {
    return state.activities;
  }

  @Action(GetProfile)
  fetchProfile(ctx: StateContext<MainStore>) {
    return this.service
      .getProfile()
      .pipe(tap((res) => ctx.patchState({ profile: res })));
  }

  @Action(GetActivities)
  fetchActivites(ctx: StateContext<MainStore>, { request }: GetActivities) {
    return this.service
      .fetchActivites(request)
      .pipe(tap((activities) => ctx.patchState({ activities })));
  }

  @Action(AddActivitiy)
  addActivity(ctx: StateContext<MainStore>, { payload }: AddActivitiy) {
    return ctx.setState(patch({ activities: insertItem(payload) }));
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
