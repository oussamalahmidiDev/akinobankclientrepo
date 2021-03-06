import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Compte } from "../models/compte";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComptesService {
  BASE_URL = environment.BASE_URL + "/client";
  constructor(private http: HttpClient) {}

  checkCompteCredentials(
    payload: {
      numeroCompte: string;
      codeSecret: string;
    },
    operation: string
  ) {
    return this.http.post(
      `${this.BASE_URL}/api/comptes/verify_number?operation=${operation}`,
      payload
    );
  }

  fetchComptes(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.BASE_URL}/api/comptes`);
  }
  compteActivate(compte: Compte): Observable<any> {
    return this.http.put(`${this.BASE_URL}/api/comptes/active`, compte);
  }
  compteSuspend(compte: Compte): Observable<any> {
    return this.http.put(`${this.BASE_URL}/api/comptes/suspend`, compte);
  }
  compteBlock(compte: Compte): Observable<any> {
    return this.http.put(`${this.BASE_URL}/api/comptes/block`, compte);
  }

  changeCodeSecret(request: {
    numeroCompte: string;
    codeSecret: string;
    newCodeSecret: string;
    newCodeSecretConf: string;
  }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/api/comptes/changer_code`, request);
  }
}
