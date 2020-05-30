import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { VirementFormComponent } from '../virement-form/virement-form.component';
import {RechargesService} from '../../services/recharges.service';
import {Recharge} from '../../models/recharge';


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

  // tslint:disable-next-line:variable-name max-line-length
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<VirementFormComponent>, @Inject(MAT_DIALOG_DATA) public data: Recharge[], private rechargesService: RechargesService) {}

  createRecharge() {
      // @ts-ignore
      // tslint:disable-next-line:no-shadowed-variable max-line-length
      const request = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value
      };
      console.log('REQUEST, ', request);
      this.rechargesService.createRecharge(request)
        .subscribe((recharge) => {
            console.log('RES', recharge);
            this.dialogRef.close(recharge);
          },
          error =>{ console.log('RES ERR', error); alert(error.error.message); }
        );
  }

  ngOnInit() {
    console.log(this.data);
    this.firstFormGroup = this._formBuilder.group({
      numeroCompte: ['', Validators.required],
      codeSecret: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      operateur: ['', Validators.required],
      numeroTelephone: ['', Validators.required],
      montant: ['', Validators.required],
    });
  }
}
