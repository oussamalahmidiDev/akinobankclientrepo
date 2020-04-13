import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VirementFormComponent } from '../virement-form/virement-form.component';
import { Virement } from 'src/app/models/virement';

@Component({
  selector: 'app-recharge-form',
  templateUrl: './recharge-form.component.html',
  styleUrls: ['./recharge-form.component.css']
})
export class RechargeFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;

  compteExp: string = '';
  compteDest: string = '';
  montant: string = '';
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<VirementFormComponent>, @Inject(MAT_DIALOG_DATA) public data: Virement[]) {}

  createRecharge() {
    const newVirement: Virement = {
      id: "1", compteExp: this.compteExp, compteDest: this.compteDest, montant: this.montant, dateOperation: new Date().toString().substr(0,15), statut: "PENDING"
    };
    this.formIsValid = true;
    // console.log
    this.dialogRef.close(newVirement);
  }

  ngOnInit() {
    console.log(this.data);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
