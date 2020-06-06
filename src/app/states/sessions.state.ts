import { Injectable } from "@angular/core";
import { State, StateContext, Action, Selector } from "@ngxs/store";
import { AuthService } from "../services/auth.service";
import { MainStore } from "../store";
import {
  GetSessions,
  AuthorizeSession,
  BlockSession,
  DeleteSession,
} from "../actions/sessions.actions";
import { tap } from "rxjs/operators";
import { patch, updateItem, removeItem } from "@ngxs/store/operators";
import { Session } from "../models/session";

@Injectable()
@State({
  name: "sessions",
})
export class SessionsState {
  constructor(private service: AuthService) {}

  @Selector()
  static selectAllSessions(store: MainStore) {
    return store.sessions;
  }

  @Selector()
  static selectNonAuthorizedSessions(store: MainStore) {
    return store.sessions.filter((session) => session.authorized === false);
  }

  @Action(GetSessions)
  fetchServices(ctx: StateContext<MainStore>) {
    return this.service
      .getSessions()
      .pipe(tap((res) => ctx.patchState({ sessions: res })));
  }

  @Action(AuthorizeSession)
  authorizeSession(ctx: StateContext<MainStore>, { id }: AuthorizeSession) {
    return this.service.authorizeSession(id).pipe(
      tap((res) => {
        ctx.setState(
          patch({
            sessions: updateItem<Session>((session) => session.id === id, res),
          })
        );
      })
    );
  }

  @Action(BlockSession)
  blockSession(ctx: StateContext<MainStore>, { id }: BlockSession) {
    return this.service.blockSession(id).pipe(
      tap((res) => {
        ctx.setState(
          patch({
            sessions: updateItem<Session>((session) => session.id === id, res),
          })
        );
      })
    );
  }

  @Action(DeleteSession)
  deleteSession(ctx: StateContext<MainStore>, { id }: DeleteSession) {
    return this.service.deleteSession(id).pipe(
      tap((res) => {
        ctx.setState(
          patch({
            sessions: removeItem((session) => session.id === id),
          })
        );
      })
    );
  }
}
