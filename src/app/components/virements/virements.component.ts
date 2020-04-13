import { Component, OnInit, Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { VirementFormComponent } from '../virement-form/virement-form.component';
import { Virement } from 'src/app/models/virement';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Injectable()
@Component({
  selector: 'app-virements',
  templateUrl: './virements.component.html',
  styleUrls: ['./virements.component.css']
})
export class VirementsComponent implements OnInit {

  mesVirements: Virement[];
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog) {
    this.virementsDS = new MatTableDataSource<Virement>();

   }
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.mesVirements = [
      { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
      { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
      { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
    ]
    this.virementsDS.data = this.mesVirements;
  }

  openSnackBar() {
    this._snackBar.open("Virements ajouté", "OK", {
      duration: 2000,
    });
  }
  
  virementColumns: string[] = ['id', 'comptexp', 'comptedest', 'montant', 'dateOper', 'statut'];
  virementsDS: MatTableDataSource<Virement>;
  openVirementForm(): void {
    const dialogRef = this.dialog.open(VirementFormComponent, {
      width: '500px',
      data: this.mesVirements
      // virement: this.newVirement
    })
    dialogRef.afterClosed().subscribe(data => {
      console.log("Subtask Dialog output:", data);
      this.mesVirements.push(data);
      console.log(this.mesVirements);
      this.virementsDS.data = this.mesVirements;
      this.openSnackBar();
    })
  };

  

}
