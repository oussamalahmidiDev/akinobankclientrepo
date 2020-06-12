import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { VirementFormComponent } from "../virement-form/virement-form.component";
import { RechargesService } from "../../services/recharges.service";
import { Recharge } from "../../models/recharge";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store, Select } from "@ngxs/store";
import { Compte } from "../../models/compte";
import { Observable } from "rxjs";
import { ProfileState } from "../../states/profile.state";
import { CreateRecharge } from "../../actions/recharges.action";
import { User } from "../../models/user";
import { ComptesService } from "../../services/comptes.service";

@Component({
  selector: "app-recharge-form",
  templateUrl: "./recharge-form.component.html",
  styleUrls: ["./recharge-form.component.css"],
})
export class RechargeFormComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;

  credentialsVerified = false;

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  // tslint:disable-next-line:variable-name max-line-length
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VirementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Recharge[],
    private comptesService: ComptesService,
    private store: Store
  ) {}

  createRecharge() {
    // @ts-ignore
    // tslint:disable-next-line:no-shadowed-variable max-line-length
    const request = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
    };
    console.log("REQUEST, ", request);
    this.store.dispatch(new CreateRecharge(request)).subscribe(
      (r) => this.dialogRef.close(r),
      (error) => alert(error.error.message)
    );
    // this.rechargesService.createRecharge(request).subscribe(
    //   (recharge) => {
    //     console.log("RES", recharge);
    //     this.dialogRef.close(recharge);
    //   },
    //   (error) => {
    //     console.log("RES ERR", error);
    //     alert(error.error.message);
    //   }
    // );
  }

  checkCredentials() {
    this.comptesService
      .checkCompteCredentials({ ...this.firstFormGroup.value }, "recharge")
      .subscribe(
        () => {
          this.credentialsVerified = true;
          // stepper.next();
        },
        (error) => alert(error.error.message)
      );
  }

  ngOnInit() {
    console.log(this.data);
    this.firstFormGroup = this._formBuilder.group({
      numeroCompte: ["", Validators.required],
      codeSecret: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      operateur: ["", Validators.required],
      numeroTelephone: ["", Validators.required],
      montant: ["", Validators.required],
    });
  }
}
