import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Recharge } from "../models/recharge";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RechargesService {
  private BASE_URL = environment.BASE_URL + "/client/api/recharges";

  constructor(private http: HttpClient) {}

  getAllRecharges(): Observable<Recharge[]> {
    return this.http.get<Recharge[]>(this.BASE_URL);
  }

  createRecharge(recharge: any) {
    return this.http.post<Recharge>(this.BASE_URL + "/create", recharge);
  }
}
