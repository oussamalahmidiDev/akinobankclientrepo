import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RechargesService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {
  }
}
