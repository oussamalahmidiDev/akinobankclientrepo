import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  token: string;
  decodedToken: any;

  constructor(private http: HttpClient) {}

  getXSRFToken() {
    return this.http.post(
      `${environment.BASE_URL.substr(0, environment.BASE_URL.length - 7)}`,
      {}
    );
  }

  refreshToken() {
    // console.log("TokenService.refreshToken");
    return this.http
      .post(
        `${environment.BASE_URL.substr(
          0,
          environment.BASE_URL.length - 7
        )}/api/auth/refresh`,
        {}
      )
      .pipe(
        tap((response: any) => {
          this.setToken(response.token);
        })
      );
  }

  isAuthenticated(): boolean {
    const lastConnected = localStorage.getItem("last_connected");
    return lastConnected != undefined && true;
  }

  getToken() {
    return this.token;
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken;
  }

  setToken(token) {
    localStorage.setItem("last_connected", Date.now().toString());
    this.token = token;
  }

  unsetToken() {
    localStorage.removeItem("last_connected");
    this.token = this.decodedToken = null;
  }

  isTokenExpired(): boolean {
    const expiryTime: number = this.getExpiryTime();
    if (expiryTime) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }

  decodeToken() {
    if (this.token) {
      this.decodedToken = jwt_decode(this.token);
    }
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  getDecodeToken() {
    return jwt_decode(this.token);
  }
}
