import { User } from "../models/user";

export class GetProfile {
  static readonly type = "[Profile] Get";
}

export class UpdatePhoto {
  static readonly type = "[Profile] UPDATE PHOTO";

  constructor(public url: string) {}
}

export class UpdateProfile {
  static readonly type = "[Profile] UPDATE";

  constructor(public payload: User) {}
}

export class UnsetPhoto {
  static readonly type = "[Profile] UNSET PHOTO";
}
