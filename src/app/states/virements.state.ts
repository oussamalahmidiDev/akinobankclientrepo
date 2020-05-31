import { Injectable } from "@angular/core";
import { State, StateContext, Action, Selector } from "@ngxs/store";
import { VirementsService } from "../services/virements.service";
import { MainStore } from "../store";
import { GetVirements, CreateVirement } from "../actions/virements.action";
import { tap } from "rxjs/operators";

import { patch, insertItem } from "@ngxs/store/operators";
import { UpdatePhoto } from "../actions/profile.actions";

@Injectable()
@State({
  name: "virements",
})
export class VirementsState {
  constructor(private service: VirementsService) {}

  @Selector()
  static selectVirements(state: MainStore) {
    return state.virements;
  }

  @Action(GetVirements)
  fetchVirements(ctx: StateContext<MainStore>) {
    return this.service
      .getAllVirements()
      .pipe(tap((res) => ctx.patchState({ virements: res })));
  }

  @Action(CreateVirement)
  addVirement(ctx: StateContext<MainStore>, { payload }: CreateVirement) {
    return this.service
      .createVirement(payload)
      .pipe(tap((res) => ctx.setState(patch({ virements: insertItem(res) }))));
  }
}
