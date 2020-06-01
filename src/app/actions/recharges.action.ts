import { Recharge } from "../models/recharge";

export class GetRecharges {
  static readonly type = '[Recharges] Get';
}

export class CreateRecharge {
  static readonly type = '[Recharges] Create';

  constructor(public payload: any) {}
}
