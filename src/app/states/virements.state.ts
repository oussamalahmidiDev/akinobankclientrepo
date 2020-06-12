import { Injectable } from "@angular/core";
import { State, StateContext, Action, Selector, Store } from "@ngxs/store";
import { VirementsService } from "../services/virements.service";
import { MainStore } from "../store";
import {
  GetVirements,
  CreateVirement,
  ConfirmVirement,
  ConfirmVirementReceipt,
} from "../actions/virements.action";
import { tap } from "rxjs/operators";

import { patch, insertItem, updateItem } from "@ngxs/store/operators";
import { UpdatePhoto } from "../actions/profile.actions";

@Injectable()
@State({
  name: "virements",
})
export class VirementsState {
  constructor(private service: VirementsService, private store: Store) {}

  @Selector()
  static selectSentVirements(state: MainStore) {
    return state.allVirements.sent;
  }

  @Selector()
  static selectAllVirements(state: MainStore) {
    return [...state.allVirements.sent, ...state.allVirements.received];
  }

  @Selector()
  static selectReceivedVirements(state: MainStore) {
    return state.allVirements.received;
  }

  @Action(GetVirements)
  fetchVirements(ctx: StateContext<MainStore>) {
    return this.service.getAllVirements().pipe(
      tap((res) =>
        ctx.patchState({
          allVirements: res,
        })
      )
    );
  }

  @Action(CreateVirement)
  addVirement(ctx: StateContext<MainStore>, { payload }: CreateVirement) {
    return this.service
      .createVirement(payload)
      .pipe(tap((res) => this.store.dispatch(new GetVirements())));
  }

  @Action(ConfirmVirement)
  confirmVirement(
    ctx: StateContext<MainStore>,
    { id, payload }: ConfirmVirement
  ) {
    return this.service
      .confirmVirement(id, payload)
      .pipe(tap((res) => this.store.dispatch(new GetVirements())));
  }

  @Action(ConfirmVirementReceipt)
  confirmVirementReceipt(
    ctx: StateContext<MainStore>,
    { id }: ConfirmVirementReceipt
  ) {
    return this.service
      .confirmVirementReceipt(id)
      .pipe(tap((res) => this.store.dispatch(new GetVirements())));
  }
}
