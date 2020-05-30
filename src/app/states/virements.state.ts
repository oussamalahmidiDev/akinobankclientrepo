import { Injectable } from "@angular/core";
import { State, StateContext, Action, Selector } from "@ngxs/store";
import { VirementsService } from "../services/virements.service";
import { MainStore } from "../store";
import { GetVirements } from "../actions/virements.action";
import { tap } from "rxjs/operators";

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
}
