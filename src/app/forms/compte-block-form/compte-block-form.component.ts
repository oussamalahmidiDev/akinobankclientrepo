import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ComptesService } from "../../services/comptes.service";
import { Compte } from "../../models/compte";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { VirementFormComponent } from "../../components/virement-form/virement-form.component";
import { Store } from "@ngxs/store";

@Component({
  selector: "app-compte-block-form",
  templateUrl: "./compte-block-form.component.html",
  styleUrls: ["./compte-block-form.component.css"],
})
export class CompteBlockFormComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  credentialsVerified = false;

  constructor(
    private comptesService: ComptesService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VirementFormComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Compte
  ) {}

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
      numeroCompte: ['', Validators.required],
      codeSecret: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      raison: ['', Validators.required],
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
    this.comptesService.compteBlock({ ...this.firstFormGroup.value, ...this.secondFormGroup.value })
      .subscribe((data) => this.dialogRef.close(data), (error) => alert(error.error.message));
  }
}
