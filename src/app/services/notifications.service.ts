import { Injectable } from "@angular/core";
import { TokenService } from "./token.service";
import { CookieService } from "./cookie.service";
import { WebsocketService } from "./websocket.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

import { Notification } from "../models/notification";

@Injectable({
  providedIn: "root",
})
export class NotificationsService {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  get(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.BASE_URL}/api/notifications`);
  }

  markAsSeen() {
    return this.http.post(`${this.BASE_URL}/api/notifications/mark_seen`, {});
  }
}
