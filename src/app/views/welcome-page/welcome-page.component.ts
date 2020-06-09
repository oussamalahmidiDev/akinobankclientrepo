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
  loggingIn = false;

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
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", Validators.required),
    });
    this._2faFormGroup = new FormGroup({
      code: new FormControl("", [
        Validators.required,
        Validators.pattern(/[0-9]{6,6}/),
      ]),
    });
    this.tokenService
      .getXSRFToken()
      .subscribe(() => console.log("XSRF loaded"));
  }

  switchForms() {
    this.error = null;
    this._2faForm = false;
  }

  sendVerifyCodeRequest() {
    if (this._2faFormGroup.invalid || this.loggingIn) {
      return;
    }
    this.error = null;
    this.loggingIn = true;
    this.authService
      .verifyAuthCode({
        ...this.loginFormGroup.value,
        ...this._2faFormGroup.value,
      })
      .subscribe(
        (data) => this.authenticate(data.token),
        (err) => {
          this.error = err.error.message;
          this.loggingIn = false;
        }
      );
  }

  authenticate(token: string): void {
    this.tokenService.setToken(token);
    this.router.navigate(["home"]);
  }

  sendVerificationMail() {
    this.authService
      .sendVerificationMail(this.loginFormGroup.value)
      .subscribe(() => alert("Email de confirmation a été envoyé"));
  }

  login() {
    if (this.loginFormGroup.invalid || this.loggingIn) {
      return;
    }
    this.error = null;
    this.loggingIn = true;
    this.authService.login(this.loginFormGroup.value).subscribe(
      (data) => {
        this.loggingIn = false;
        console.log(data);
        if (data["2fa_enabled"]) {
          this._2faForm = true;
        } else this.authenticate(data.token);
      },
      (err) => {
        console.log(err);
        this.loggingIn = false;
        this.error = err.error.message;
      }
    );
  }
}
