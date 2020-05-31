import { Virement } from "../models/virement";

export class GetVirements {
  static readonly type = "[Virements] Get";
}

export class CreateVirement {
  static readonly type = "[Virements] Create";

  constructor(public payload: any) {}
}
