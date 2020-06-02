import { Injectable } from "@angular/core";
import { State, StateContext, Action, Store, Selector } from "@ngxs/store";
import { ComptesService } from "../services/comptes.service";
import { MainStore } from "../store";
import { FetchComptes } from "../actions/comptes.actions";
import { tap } from "rxjs/operators";
import { patch, updateItem } from "@ngxs/store/operators";
import { Compte } from "../models/compte";
import { ProfileState } from "./profile.state";

@Injectable()
@State({
  name: "comptes",
})
export class ComptesState {
  constructor(private service: ComptesService, private store: Store) {}

  @Selector()
  static selectComptes(store: MainStore) {
    return store.comptes;
  }

  @Action(FetchComptes)
  fetchComptes(ctx: StateContext<MainStore>) {
    return this.service
      .fetchComptes()
      .pipe(tap((comptes) => ctx.patchState({ comptes })));
  }
}
