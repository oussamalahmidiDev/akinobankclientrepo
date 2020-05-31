import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {
  error: string = null;

  loginFormGroup: FormGroup;

  constructor(private router: Router, private authService: UserService, private tokenService: TokenService) {
  }

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  authenticate(): void {
    localStorage.setItem('loggedin', '1');
    this.router.navigateByUrl('/dashboard');
  }

  login() {
    this.authService.login(this.loginFormGroup.value).subscribe(
      data => {
        console.log(data);
        this.tokenService.setNewToken(data.token);
        this.router.navigate(['home']);
        // this.authService.currentUser.name = data['user']['nom'] + ' ' + data['user']['prenom']
        // localStorage.setItem('loggedin', "1");
      },
      err => {
        this.error = err.error.message;
      }
    );


    // const login = await this.authService.login(email, password);
    // await console.log("LOGIN",login);
    // if (!login.success) {
    //   this.error = login.message;
    //   console.log(email, password);
    // }
    // return false;
  }
}
