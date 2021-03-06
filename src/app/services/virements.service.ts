import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Virement } from "../models/virement";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VirementsService {
  private BASE_URL = environment.BASE_URL + "/client/api/virements";

  constructor(private http: HttpClient) {}

  getAllVirements(): Observable<any> {
    return this.http.get<any>(this.BASE_URL);
  }

  createVirement(virement: any) {
    return this.http.post<Virement>(this.BASE_URL + "/create", virement);
  }

  confirmVirement(id: number, request: { codeVerification: string }) {
    return this.http.post<Virement>(`${this.BASE_URL}/${id}/confirm`, request);
  }

  confirmVirementReceipt(id: number) {
    return this.http.post<Virement>(
      `${this.BASE_URL}/${id}/confirm_receipt`,
      {}
    );
  }
}
