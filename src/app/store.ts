import { User } from "./models/user";
import { Virement } from "./models/virement";
import { Recharge } from "./models/recharge";
import { Compte } from "./models/compte";
import { Session } from "./models/session";
import { Activity } from "./models/activity";

export class MainStore {
  profile: User;
  virements: Virement[];
  recharges: Recharge[];
  comptes: Compte[];
  sessions: Session[];
  activities: Activity[];

  sentVirements: Virement[];
  receivedVirements: Virement[];

  allVirements: any;
}
