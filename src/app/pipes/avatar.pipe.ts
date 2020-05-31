import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

@Pipe({
  name: "avatar",
})
export class AvatarPipe implements PipeTransform {
  BASE_URL = environment.BASE_URL;

  constructor(private http: HttpClient) {}

  transform(photo: string): Observable<string> {
    return this.http
      .get(`${this.BASE_URL}/api/avatar/${photo}`, { responseType: "blob" })
      .pipe(
        map((res) => URL.createObjectURL(res)),
        map((url) => `url(${url})`)
      );
  }
}
