import { Component, OnInit, Inject } from "@angular/core";
import { ComptesService } from "../../../services/comptes.service";
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { Compte } from "../../../models/compte";

@Component({
  selector: "app-changer-code",
  templateUrl: "./changer-code.component.html",
  styleUrls: ["./changer-code.component.css"],
})
export class ChangerCodeComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  credentialsVerified = false;

  constructor(
    private comptesService: ComptesService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ChangerCodeComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Compte
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      numeroCompte: ["", Validators.required],
      codeSecret: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group(
      {
        newCodeSecret: ["", [Validators.required, Validators.min(8)]],
        newCodeSecretConf: ["", [Validators.required]],
      },
      { validators: this.passwordMatching }
    );
    this.firstFormGroup.patchValue({ ...this.data });
  }

  checkCredentials() {
    this.comptesService
      .checkCompteCredentials({ ...this.firstFormGroup.value })
      .subscribe(
        () => {
          this.credentialsVerified = true;
          // stepper.next();
        },
        (error) => alert(error.error.message)
      );
  }

  onSubmit() {
    console.log(this.firstFormGroup.value, this.secondFormGroup.value);
    this.comptesService.changeCodeSecret({ ...this.firstFormGroup.value, ...this.secondFormGroup.value })
      .subscribe(() => this.dialogRef.close(true), error => alert(error.error.message));

  }

  passwordMatching(c: AbstractControl): { invalid: boolean } {
    if (c.get("newCodeSecret").value !== c.get("newCodeSecretConf").value) {
      return { invalid: true };
    }
  }
}
