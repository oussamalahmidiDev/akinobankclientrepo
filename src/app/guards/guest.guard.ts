import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";
import { map } from "rxjs/operators";
import { TokenService } from "../services/token.service";

@Injectable({
  providedIn: "root",
})
export class GuestGuard implements CanActivate {
  constructor(private tokenService: TokenService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | boolean {
    if (this.tokenService.isAuthenticated()) {
      this.router.navigateByUrl("/home/dashboard");
      return false;
    } else {
      return true;
    }
  }
}
