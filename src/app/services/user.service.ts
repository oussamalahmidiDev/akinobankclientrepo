import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Demande } from "../models/demande";
import { environment } from "../../environments/environment";
import { Activity } from "../models/activity";

@Injectable({
  providedIn: "root",
})
export class UserService {
  currentUser: User;
  isLoggedIn: BehaviorSubject<boolean>;
  private BASE_URL = environment.BASE_URL + "/client";

  constructor(private router: Router, private http: HttpClient) {
    // this.setCurrentUser();
    // this.getCurrentUser();
    this.currentUser = null;
  }

  // options = new RequestOptions({ withCredentials: true });

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/api/profile`);
  }

  fetchActivites(request: {
    offset: number;
    limit: number;
  }): Observable<Activity[]> {
    return this.http.get<Activity[]>(
      `${this.BASE_URL}/api/activities?offset=${request.offset}&limit=${request.limit}`
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
    return this.http.post(
      `${this.BASE_URL}/api/profile/change_password`,
      request
    );
  }

  uploadImage(image: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("image", image);
    return this.http.post(
      `${this.BASE_URL}/api/profile/avatar/upload`,
      formData,
      {
        responseType: "json",
        reportProgress: true,
        observe: "events",
      }
    );
  }

  getQRCode() {
    return this.http
      .get(`${this.BASE_URL}/api/profile/code/generate`, {
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
    return this.http.post(
      `${this.BASE_URL}/api/profile/code/validate`,
      request,
      {
        headers: { "X-QR-CODE": secretKey },
      }
    );
  }

  deletePhoto(): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/api/profile/avatar/delete`);
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: UserService, useClass: UserService },
];
