import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Virement} from '../models/virement';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VirementsService {

  private BASE_URL = environment.BASE_URL + '/api/virements';

  constructor(private http: HttpClient) { }

  getAllVirements(): Observable<Virement[]> {
    return this.http.get<Virement[]>(this.BASE_URL);
  }

   createVirement(virement: any) {
    return this.http.post<Virement>(this.BASE_URL+'/create', virement);
  }

}
