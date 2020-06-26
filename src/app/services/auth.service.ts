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
  // BASE_URL = environment.BASE_URL;
  BASE_URL = environment.BASE_URL;

  private cookieStore = {};
  sessionId: string;

  constructor(private http: HttpClient) {
    this.sessionId = this.get("session_id");
    console.log("session Id", this.sessionId);
  }

  login(request: { email: string; password: string }): Observable<any> {
    console.log("Loggin in");
    return this.http
      .post(`${this.BASE_URL}/api/auth`, request, { withCredentials: true })
      .pipe(map((res) => res));
  }

  sendRecoveryRequest(request: {
    email: string;
    operation: string;
  }): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/recover_account`, request, {
        withCredentials: true,
      })
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

  sendVerificationMail(request: { email: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/verify`, request);
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/api/auth/logout`, {});
  }

  getSessions(): Observable<Session[]> {
    return this.http
      .get<Session[]>(`${this.BASE_URL}/api/auth/sessions`)
      .pipe();
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
