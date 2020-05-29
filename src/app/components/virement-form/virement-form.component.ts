import { Component, OnInit, Inject, EventEmitter, Output } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { VirementsComponent } from '../virements/virements.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Virement } from 'src/app/models/virement';
import {VirementsService} from '../../services/virements.service';

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
  myVirement: Virement = {
    id: 0,
    compteExp: '',
    compteDest: '',
    montant: '',
    dateOperation: new Date(),
    statut: ''
  };


  // tslint:disable-next-line:max-line-length variable-name
  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<VirementFormComponent>, @Inject(MAT_DIALOG_DATA) public data: Virement[], private virementsService: VirementsService) {}
  createVirement() {
    // @ts-ignore
    // tslint:disable-next-line:no-shadowed-variable max-line-length
    const request = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value
    };
    console.log('REQUEST, ', request);
    this.virementsService.createVirement(request)
      .subscribe((virement) => {
        console.log('RES', virement);
        this.dialogRef.close(virement);
      },
        error =>{ console.log('RES ERR', error); alert(error.error.message); }
      );
   /// this.formIsValid = true;
    // console.log
   // this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    this.firstFormGroup = this._formBuilder.group({
      numeroCompte: ['', Validators.required],
      codeSecret: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      numeroCompteDest: ['', Validators.required],
      montant: ['', Validators.required],
      notes: [''],
    });
  }

}
