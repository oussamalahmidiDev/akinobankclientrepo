import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "./services/token.service";
import { Store } from "@ngxs/store";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();
    if (token)
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          //   ContentType : 'application/json; charset=utf-8',
        },
      });
    return next.handle(req);
  }
}
