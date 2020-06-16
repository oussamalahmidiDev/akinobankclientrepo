import { InjectableRxStompConfig } from "@stomp/ng2-stompjs";
import { TokenService } from "./app/services/token.service";
import { CookieService } from "./app/services/cookie.service";

export class StompConfig extends InjectableRxStompConfig {
  constructor(
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {
    super();
  }

  //   brokerURL = new SockJS('hjj');
  connectHeaders = {
    Authorization: "Bearer " + this.tokenService.getToken(),
    "X-XSRF-TOKEN": this.cookieService.get("XSRF-TOKEN"),
  };
  heartbeatIncoming = 0;
  debug = (msg: string): void => {
    console.log(new Date(), msg);
  };
}
