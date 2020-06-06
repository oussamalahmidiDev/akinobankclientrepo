export class GetSessions {
  static readonly type = "[Sessions] Get";
}

export class AuthorizeSession {
  static readonly type = "[Sessions] Authorize";

  constructor(public id: string) {}
}

export class BlockSession {
  static readonly type = "[Sessions] Block";

  constructor(public id: string) {}
}
export class DeleteSession {
  static readonly type = "[Sessions] Delete";

  constructor(public id: string) {}
}
