import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  isLoaded = false;
  currentUser: User;

  ngOnInit() {
    this.userService.getProfile()
    .subscribe(data => {
      this.currentUser = data;
      this.isLoaded = true;
      this.currentUser.photo = environment.BASE_URL + "/api/avatar/" + data.photo;

    });
  }

  logout() : void {
    this.userService.logout();
  }

  constructor(private userService: UserService) {}

}
