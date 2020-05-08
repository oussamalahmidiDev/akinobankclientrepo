import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {
  }
}
