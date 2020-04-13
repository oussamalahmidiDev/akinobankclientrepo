import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { RechargeFormComponent } from '../recharge-form/recharge-form.component';
import { Recharge } from 'src/app/models/recharge';


@Component({
  selector: 'app-recharges',
  templateUrl: './recharges.component.html',
  styleUrls: ['./recharges.component.css']
})
export class RechargesComponent implements OnInit {

  mesRecharges: Recharge[];
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) {
    this.rechargesDS = new MatTableDataSource<Recharge>();
   }
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.mesRecharges = [
      { numTel: "06542148", compteExp: '67139051493590', montant: "100", dateOperation: "12 Mars 2020", operateur:"Orange" },
      { numTel: "06542148", compteExp: '67139051493590', montant: "100", dateOperation: "12 Mars 2020", operateur:"Orange" },
      { numTel: "06542148", compteExp: '67139051493590', montant: "100", dateOperation: "12 Mars 2020", operateur:"Orange" },
      
    ]
    this.rechargesDS.data = this.mesRecharges;
  }

  openSnackBar() {
    this._snackBar.open("Virements ajouté", "OK", {
      duration: 2000,
    });
  }
  
  rechargesColumns: string[] = ['comptexp', 'numTel', 'montant', 'operateur','dateOper', ];
  rechargesDS: MatTableDataSource<Recharge>;
  openVirementForm(): void {
    const dialogRef = this.dialog.open(RechargeFormComponent, {
      width: '500px',
      data: this.mesRecharges
      // virement: this.newVirement
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log("Subtask Dialog output:", data);
      this.mesRecharges.push(data);
      console.log(this.mesRecharges);
      this.rechargesDS.data = this.mesRecharges;
      this.openSnackBar();
    })
  };
}
