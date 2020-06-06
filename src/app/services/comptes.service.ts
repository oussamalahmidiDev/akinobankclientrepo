import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Compte } from "../models/compte";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComptesService {
  BASE_URL = environment.BASE_URL;
  constructor(private http: HttpClient) {}

  checkCompteCredentials(payload: {
    numeroCompte: string;
    codeSecret: string;
  }) {
    return this.http.post(`${this.BASE_URL}/api/verify_number`, payload);
  }

  fetchComptes(): Observable<Compte[]> {
    return this.http.get<Compte[]>(`${this.BASE_URL}/api/comptes`);
  }
  compteSuspend(compte: Compte): Observable<any> {
    return this.http
      .put(`${this.BASE_URL}/api/comptes/suspend`, compte);
  }
  compteBlock(compte: Compte): Observable<any> {
    return this.http
      .put(`${this.BASE_URL}/api/comptes/block`, compte);
  }
}
