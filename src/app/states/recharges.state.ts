import { Injectable } from "@angular/core";
import { State, StateContext, Action, Selector } from "@ngxs/store";
import { RechargesService } from "../services/recharges.service";
import { MainStore } from "../store";
import {GetRecharges, CreateRecharge} from "../actions/recharges.action";
import { tap } from "rxjs/operators";

import { patch, insertItem } from "@ngxs/store/operators";
import { UpdatePhoto } from "../actions/profile.actions";

@Injectable()
@State({
  name: "recharges",
})
export class RechargesState {
  constructor(private service: RechargesService) {}

  @Selector()
  static selectRecharges(state: MainStore) {
    return state.recharges;
  }

  @Action(GetRecharges)
  fetchRecharges(ctx: StateContext<MainStore>) {
    return this.service
      .getAllRecharges()
      .pipe(tap((res) => ctx.patchState({ recharges: res })));
  }

  @Action(CreateRecharge)
  addVirement(ctx: StateContext<MainStore>, { payload }: CreateRecharge) {
    return this.service
      .createRecharge(payload)
      .pipe(tap((res) => ctx.setState(patch({ recharges: insertItem(res) }))));
  }
}
