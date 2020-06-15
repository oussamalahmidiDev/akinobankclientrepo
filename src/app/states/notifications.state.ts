import { Injectable } from "@angular/core";
import { State, StateContext, Action } from "@ngxs/store";
import { NotificationsService } from "../services/notifications.service";
import { MainStore } from "../store";
import {
  FetchNotifications,
  AddNotification,
  MarkAllAsSeen,
} from "../actions/notifications.actions";
import { tap } from "rxjs/operators";
import { patch, insertItem } from "@ngxs/store/operators";

@Injectable()
@State({
  name: "notifications",
})
export class NotificationsState {
  constructor(private service: NotificationsService) {}

  @Action(FetchNotifications)
  fetchNotifications(ctx: StateContext<MainStore>) {
    return this.service
      .get()
      .pipe(tap((notifications) => ctx.patchState({ notifications })));
  }

  @Action(AddNotification)
  addNotification(ctx: StateContext<MainStore>, { payload }: AddNotification) {
    return ctx.setState(patch({ notifications: insertItem(payload) }));
  }

  @Action(MarkAllAsSeen)
  markSeen(ctx: StateContext<MainStore>) {
    return this.service.markAsSeen().pipe(
      tap(() =>
        ctx.patchState({
          notifications: ctx
            .getState()
            .notifications.map(
              (notification) => (notification = { ...notification, lue: true })
            ),
        })
      )
    );
  }
}
