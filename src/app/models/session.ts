export interface Session {
  id: string;
  ip: string;
  authorized: boolean;
  timestamp: Date;
  operatingSystem: string;
  ville: string;
  pays: string;
  browser: string;
}
