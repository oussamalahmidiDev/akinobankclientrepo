import { Compte } from "../models/compte";

export class FetchComptes {
  static readonly type = "[Comptes] Get";
}

export class ChangeStatus {
  static readonly type = "[Comptes] UPDATE STATUS";
  constructor(public payload: any, public status: string) {}
}
