import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Store } from "@ngxs/store";
import { Set2FAOn } from "../../actions/profile.actions";
import { MatDialogRef } from "@angular/material/dialog";
import { Observable, interval } from "rxjs";

@Component({
  selector: "app-two-factor-qr",
  templateUrl: "./two-factor-qr.component.html",
  styleUrls: ["./two-factor-qr.component.css"],
})
export class TwoFactorQRComponent implements OnInit {
  verificationCodeFormGroup: FormGroup;

  qrCode: string;
  secretCode: string;

  constructor(
    private service: UserService,
    private formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<TwoFactorQRComponent>
  ) {}

  ngOnInit(): void {
    this.getQRCode();
    this.verificationCodeFormGroup = this.formBuilder.group({
      code: ["", Validators.required],
    });
  }

  getQRCode(): void {
    this.service.getQRCode().subscribe((data) => {
      console.log(data);
      this.qrCode = data.qr;
      this.secretCode = data.secretKey;
    });
  }

  validateCode() {
    this.service.validateCode(this.verificationCodeFormGroup.value).subscribe(
      () => {
        this.store.dispatch(new Set2FAOn());
        this.dialogRef.close(true);
      },
      (err) => alert(err.error.message)
    );
  }
}
