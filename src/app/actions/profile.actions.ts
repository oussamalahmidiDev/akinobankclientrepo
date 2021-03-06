import { User } from "../models/user";
import { Activity } from "../models/activity";

export class GetProfile {
  static readonly type = "[Profile] Get";
}

export class GetActivities {
  static readonly type = "[Activites] GET";

  constructor(public request: { offset: number; limit: number }) {}
}

export class AddActivitiy {
  static readonly type = "[Activites] Add";

  constructor(public payload: Activity) {}
}

export class UpdatePhoto {
  static readonly type = "[Profile] UPDATE PHOTO";

  constructor(public url: string) {}
}

export class Set2FAOn {
  static readonly type = "[Profile] SET 2FA ON";
}

export class UpdateProfile {
  static readonly type = "[Profile] UPDATE";

  constructor(public payload: User) {}
}

export class UnsetPhoto {
  static readonly type = "[Profile] UNSET PHOTO";
}
