import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { TokenService } from "./services/token.service";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject, throwError } from "rxjs";
import { switchMap, filter, take, catchError } from "rxjs/operators";
import { CookieService } from "./services/cookie.service";
import { Store } from "@ngxs/store";
import { MainStore } from "./store";
import { WebsocketService } from "./services/websocket.service";

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService,
    private router: Router,
    private store: Store,
    private websocketService: WebsocketService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    // if (token) {
    token !== undefined && token !== null
      ? (req = this.addToken(req, token))
      : (req = this.addToken(req, ""));
    // }
    // console.log("Setting XSRF", this.cookieService.get("XSRF-TOKEN"));
    // req.clone({
    //   setHeaders: {
    //     ,
    //   },
    // });

    return next.handle(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(req, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    if (request.method === "GET")
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    console.log("Setting XSRF token", this.cookieService.get("XSRF-TOKEN"));
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        "X-XSRF-TOKEN": this.cookieService.get("XSRF-TOKEN"),
      },
      withCredentials: true,
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    console.log("Handling 401 error");
    if (!this.isRefreshing || true) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      console.log("Refreshing token...");
      // this.websocketService.disconnect();
      return this.tokenService.refreshToken().pipe(
        switchMap((response: any) => {
          this.isRefreshing = false;
          console.log("Refreshing succeded...");
          this.refreshTokenSubject.next(response.token);
          // this.websocketService.connect();
          return next.handle(this.addToken(request, response.token));
        }),
        catchError((error) => {
          console.log("Refreshing error...");
          if (error instanceof HttpErrorResponse && error.status === 403) {
            this.tokenService.unsetToken();
            this.store.reset(new MainStore());
            console.log("Logging out...");
            this.router.navigate(["/"]);
          }
          return throwError(error);
        })
      );
    } else {
      console.log("Already refreshed...");
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          console.log("Using refreshed token...");
          return next.handle(this.addToken(request, jwt));
        })
      );
    }
  }
}
