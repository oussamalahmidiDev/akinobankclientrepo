import { User } from "./models/user";
import { Virement } from "./models/virement";
import { Recharge } from "./models/recharge";
import { Compte } from "./models/compte";
import { Session } from "./models/session";

export class MainStore {
  profile: User;
  virements: Virement[];
  recharges: Recharge[];
  comptes: Compte[];
  sessions: Session[];
}
