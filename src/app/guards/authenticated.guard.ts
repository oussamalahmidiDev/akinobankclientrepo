import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivate,
} from "@angular/router";
import { Observable, of } from "rxjs";
import { UserService } from "../services/user.service";
import { map, catchError } from "rxjs/operators";
import { TokenService } from "../services/token.service";

@Injectable({
  providedIn: "root",
})
export class AuthenticatedGuard implements CanActivate {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private tokenService: TokenService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | boolean {
    if (this.tokenService.getUser()) {
      if (this.tokenService.isTokenExpired()) {
        this.router.navigateByUrl("/");
        return false;
      } else {
        return true;
      }
    } else {
      this.router.navigateByUrl("/");
      return false;
    }
  }
}
