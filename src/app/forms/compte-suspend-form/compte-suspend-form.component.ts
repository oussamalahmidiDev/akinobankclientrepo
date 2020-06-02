import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ComptesService } from "../../services/comptes.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { Compte } from "../../models/compte";

@Component({
  selector: "app-compte-suspend-form",
  templateUrl: "./compte-suspend-form.component.html",
  styleUrls: ["./compte-suspend-form.component.css"],
})
export class CompteSuspendFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  credentialsVerified = false;

  constructor(
    private comptesService: ComptesService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CompteSuspendFormComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Compte
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      numeroCompte: ["", Validators.required],
      codeSecret: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      raison: ["", Validators.required],
    });

    this.firstFormGroup.patchValue({ ...this.data });
    console.log(this.firstFormGroup.value);
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
    this.comptesService.compteSuspend({ ...this.firstFormGroup.value, ...this.secondFormGroup.value })
      .subscribe((data) => this.dialogRef.close(data), (error) => alert(error.error.message));
  }
}
