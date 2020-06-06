import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Session } from "../models/session";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  BASE_URL = environment.BASE_URL.substr(0, environment.BASE_URL.length - 7);

  private cookieStore = {};
  sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = this.get("session_id");
    console.log("session Id", this.sessionId);
  }

  login(request: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/api/auth`, request, { withCredentials: true })
      .pipe(map((res) => res));
  }

  verifyAuthCode(request: {
    email: string;
    password: string;
    code: number;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/auth/code`, request, {
      withCredentials: true,
    });
  }

  logout() {
    return this.http.post(
      `${this.BASE_URL}/api/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  }

  getSessions(): Observable<Session[]> {
    return this.http
      .get<Session[]>(`${this.BASE_URL}/api/auth/sessions`)
      .pipe
      // map((sessions) =>
      //   sessions.filter((session) => session.id !== this.sessionId)
      // )
      ();
  }

  authorizeSession(id: string): Observable<Session> {
    return this.http.put<Session>(
      `${this.BASE_URL}/api/auth/sessions/${id}/authorize`,
      {}
    );
  }

  blockSession(id: string): Observable<Session> {
    return this.http.put<Session>(
      `${this.BASE_URL}/api/auth/sessions/${id}/block`,
      {}
    );
  }

  public parseCookies(cookies = document.cookie) {
    if (!!cookies === false) {
      return;
    }
    const cookiesArr = cookies.split(";");
    for (const cookie of cookiesArr) {
      const cookieArr = cookie.split("=");
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  get(key: string) {
    this.parseCookies();
    return !!this.cookieStore[key] ? this.cookieStore[key] : null;
  }

  deleteSession(id: string) {
    return this.http.delete(`${this.BASE_URL}/api/auth/sessions/${id}/delete`);
  }
}