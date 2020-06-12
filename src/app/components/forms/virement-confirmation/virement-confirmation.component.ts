import { Component, OnInit, Inject } from "@angular/core";
import { VirementsService } from "../../../services/virements.service";
import { Virement } from "../../../models/virement";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Store } from "@ngxs/store";
import { ConfirmVirement } from "../../../actions/virements.action";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-virement-confirmation",
  templateUrl: "./virement-confirmation.component.html",
  styleUrls: ["./virement-confirmation.component.css"],
})
export class VirementConfirmationComponent implements OnInit {
  formGroup: FormGroup;

  virementConfirmed = false;

  constructor(
    private comptesService: VirementsService,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<VirementConfirmationComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Virement
  ) {}

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      codeVerification: ["", [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    this.store
      .dispatch(new ConfirmVirement(this.data.id, this.formGroup.value))
      .subscribe(
        () => (this.virementConfirmed = true),
        (error) => alert(error.error.message)
      );
  }

  close() {
    this.dialogRef.close();
  }
}
