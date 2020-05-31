import { Injectable } from "@angular/core";
import * as jwt_decode from "jwt-decode";

@Injectable({
  providedIn: "root",
})
export class TokenService {
  token: string;
  decodedToken: any;

  constructor() {
    this.setToken();
  }

  getToken() {
    return this.token;
  }

  getUser() {
    this.decodeToken();
    return this.decodedToken.user;
  }

  setToken() {
    const token = localStorage.getItem("token");
    if (token != undefined) {
      this.token = token;
    }
  }

  setNewToken(token) {
    localStorage.removeItem("token");
    localStorage.setItem("token", token);
    this.token = token;
  }

  unsetToken() {
    localStorage.removeItem("token");
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
