import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Demande } from "../models/demande";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentUser: User;
  isLoggedIn: BehaviorSubject<boolean>;
  private BASE_URL = environment.BASE_URL;

  constructor(private router: Router, private http: HttpClient) {
    // this.setCurrentUser();
    // this.getCurrentUser();
    this.currentUser = null;
  }

  // options = new RequestOptions({ withCredentials: true });

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/api/profile`);
  }

  logout() {
    return this.http.post(
      `${this.BASE_URL.substr(0, this.BASE_URL.length - 7)}/api/auth/logout`,
      {}
    );
  }

  updateProfile(request: User): Observable<any> {
    return this.http
      .post(`${this.BASE_URL}/api/profile/changer`, request)
      .pipe(map((res) => res));
  }

  changePassword(request: {
    oldPassword: string;
    newPassword: string;
    confPassword: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/change_password`, request);
  }

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("image", image);
    return this.http.post(`${this.BASE_URL}/api/avatar/upload`, formData, {
      responseType: "json",
      reportProgress: true,
      observe: "events",
    });
  }

  getQRCode() {
    return this.http
      .get(`${this.BASE_URL}/api/code/generate`, {
        observe: "response",
        responseType: "blob" as "json",
      })
      .pipe(
        map((res: HttpResponse<Blob>) => {
          console.log(res);
          return {
            qr: URL.createObjectURL(res.body),
            secretKey: res.headers.get("X-QR-CODE"),
          };
        })
      );
  }

  validateCode(request: { code: number }, secretKey: string): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/code/validate`, request, {
      headers: { "X-QR-CODE": secretKey },
    });
  }

  verifyAuthCode(request: {
    email: string;
    password: string;
    code: number;
  }): Observable<any> {
    return this.http.post(
      `${this.BASE_URL.substr(0, this.BASE_URL.length - 7)}/api/auth/code`,
      request,
      { withCredentials: true }
    );
  }

  deletePhoto(): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/avatar/delete`);
  }

  login(request: { email: string; password: string }): Observable<any> {
    return this.http
      .post(`${this.BASE_URL.substr(0, 21)}/api/auth`, request)
      .pipe(map((res) => res));
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: UserService, useClass: UserService },
];
