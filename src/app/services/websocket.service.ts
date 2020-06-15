import { Injectable } from "@angular/core";
import { Stomp, StompJs } from "stompjs";
import * as SockJS from "sockjs-client";
import { StyleCompiler } from "@angular/compiler";
import { TokenService } from "./token.service";
import { CookieService } from "./cookie.service";
import { of } from "rxjs";
import { StompConfig, StompRService, StompState } from "@stomp/ng2-stompjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  stompClient: any;
  socket: any;

  config: StompConfig;

  isConnected: boolean = false;

  public getStomp() {
    return this.stompService;
  }

  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService,
    public stompService: StompRService
  ) {}

  public connect() {
    this.isConnected = true;
    this.config = {
      headers: {
        Authorization: "Bearer " + this.tokenService.getToken(),
        "X-XSRF-TOKEN": this.cookieService.get("XSRF-TOKEN"),
      },
      heartbeat_in: 30000,
      heartbeat_out: 30000,
      reconnect_delay: 5000,
      url: () =>
        new SockJS(
          `${environment.BASE_URL.substr(
            0,
            environment.BASE_URL.length - 7
          )}/ws`
        ),
      debug: true,
    };
    this.stompService.config = this.config;
    this.stompService.initAndConnect();

    this.stompService.webSocketErrors$.subscribe((error) => {
      console.log("Error receiving connection", error);
    });

    // console.log("WS connecting..");
  }

  public getStompClient() {
    return this.stompClient;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}
