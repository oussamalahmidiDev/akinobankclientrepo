import { Virement } from "../models/virement";

export class GetVirements {
  static readonly type = "[Virements] Get";
}

export class CreateVirement {
  static readonly type = "[Virements] Create";

  constructor(public payload: any) {}
}

export class ConfirmVirement {
  static readonly type = "[Virements] Confirm";

  constructor(public id: number, public payload: any) {}
}

export class ConfirmVirementReceipt {
  static readonly type = "[Virements] Confirm RECEIPT";

  constructor(public id: number) {}
}
