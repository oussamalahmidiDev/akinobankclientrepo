import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TokenService } from "../../services/token.service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"],
})
export class WelcomePageComponent implements OnInit {
  error: string = null;

  _2faForm = false;

  loginFormGroup: FormGroup;
  _2faFormGroup: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.loginFormGroup = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
    });
    this._2faFormGroup = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.pattern(/[0-9]{6,6}/),
      ]),
    });
  }

  switchForms() {
    this.error = null;
    this._2faForm = false;
  }

  sendVerifyCodeRequest() {
    this.error = null;
    this.authService
      .verifyAuthCode({
        ...this.loginFormGroup.value,
        ...this._2faFormGroup.value,
      })
      .subscribe(
        (data) => this.authenticate(data.token),
        (err) => (this.error = err.error.message)
      );
  }

  authenticate(token: string): void {
    this.tokenService.setToken(token);
    this.router.navigate(["home"]);
  }

  login() {
    this.error = null;
    this.authService.login(this.loginFormGroup.value).subscribe(
      (data) => {
        console.log(data);
        if (data["2fa_enabled"]) {
          this._2faForm = true;
        } else this.authenticate(data.token);
      },
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
