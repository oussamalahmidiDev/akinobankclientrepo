import { Injectable } from "@angular/core";
import { User } from "../models/user";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
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

  verifyAuthCode(request: { email: string; code: number }): Observable<any> {
    return this.http.post(
      `${this.BASE_URL.substr(0, 21)}/api/auth/code`,
      request
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

  logout(): any {
    localStorage.removeItem("userid");
    this.router.navigate([""]);
  }

  getCurrentUser(): User {
    return this.currentUser;
    // return this.http
    //   .get<User>(`${this.BASE_URL}/api/me`, {withCredentials: true})
    //   .pipe(
    //     map(
    //       res => {
    //         // this.isLoggedIn = new BehaviorSubject<boolean>(undefined);
    //         // // if(!this.isLoggedIn)
    //         // //   return;
    //         // this.isLoggedIn.next(true);
    //         this.currentUser = res;
    //         console.log(res);
    //         return res;
    //       }
    //     )
    //   );
  }

  // setCurrentUser(): void {
  //   this.getCurrentUser().subscribe(
  //     data => {
  //       console.log('SETTING CRRENT USR', data);
  //       this.currentUser = data;
  //       // this.isLoggedIn = true;
  //     }
  //   )
  // }

  // authStatus() {

  // }

  // async isLoggedIn(): boolean {
  //   await this.setCurrentUser();
  //   if (this.currentUser !== undefined)
  //     console.log("YOUR LOGGED IN");
  //   return this.currentUser !== undefined;
  // }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: UserService, useClass: UserService },
];
