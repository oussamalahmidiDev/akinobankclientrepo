import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { VirementsComponent } from '../virements/virements.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Virement } from 'src/app/models/virement';

@Component({
  selector: 'app-virement-form',
  templateUrl: './virement-form.component.html',
  styleUrls: ['./virement-form.component.css']
})
export class VirementFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;

  compteExp: string = '';
  compteDest: string = '';
  montant: string = '';
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<VirementFormComponent>, @Inject(MAT_DIALOG_DATA) public data: Virement[]) {}

  createVirement() {
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
