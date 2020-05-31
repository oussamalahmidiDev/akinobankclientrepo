import {
  Component,
  OnInit,
  Inject,
  EventEmitter,
  Output,
  ViewChildren,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { VirementsComponent } from "../virements/virements.component";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { VirementsService } from "../../services/virements.service";
import { Virement } from "../../models/virement";
import { Store, Select } from "@ngxs/store";
import { CreateVirement } from "../../actions/virements.action";
import { User } from "../../models/user";
import { Observable } from "rxjs";
import { ProfileService } from "../../services/profile.service";
import { ProfileState } from "../../states/profile.state";
import { ComptesService } from "../../services/comptes.service";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-virement-form",
  templateUrl: "./virement-form.component.html",
  styleUrls: ["./virement-form.component.css"],
})
export class VirementFormComponent implements OnInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;

  credentialsVerified = false;

  @ViewChild("VerificationStep", { static: false })
  verificationStep: MatStepper;

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  // tslint:disable-next-line:max-line-length variable-name
  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VirementFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Virement[],
    private virementsService: VirementsService,
    private comptesService: ComptesService,
    private store: Store
  ) {}

  checkCredentials(stepper: MatStepper) {
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

  createVirement() {
    // @ts-ignore
    // tslint:disable-next-line:no-shadowed-variable max-line-length
    const request = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
    };
    console.log("REQUEST, ", request);

    this.store
      .dispatch(new CreateVirement(request))
      .subscribe(() => this.dialogRef.close());

    // this.virementsService.createVirement(request).subscribe(
    //   (virement) => {
    //     console.log("RES", virement);
    //     this.dialogRef.close(virement);
    //   },
    //   (error) => {
    //     console.log("RES ERR", error);
    //     alert(error.error.message);
    //   }
    // );
    /// this.formIsValid = true;
    // console.log
    // this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.verificationStep);
    this.firstFormGroup = this._formBuilder.group({
      numeroCompte: ["", Validators.required],
      codeSecret: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      numeroCompteDest: ["", Validators.required],
      montant: ["", Validators.required],
      notes: [""],
    });
  }

  ngAfterViewInit(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    console.log(this.verificationStep);
    // cl
  }
}
