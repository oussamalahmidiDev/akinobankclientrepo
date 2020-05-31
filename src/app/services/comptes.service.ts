import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

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
}
