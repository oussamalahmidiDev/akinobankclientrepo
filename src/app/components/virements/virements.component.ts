import { Component, OnInit, Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { VirementFormComponent } from '../virement-form/virement-form.component';
import { Virement } from 'src/app/models/virement';
import {VirementsService} from '../../services/virements.service';

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
  // tslint:disable-next-line:variable-name
  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private virementsService: VirementsService) {
    this.virementsDS = new MatTableDataSource<Virement>();
   }



  virements: Virement[];

  virementColumns: string[] = ['id', 'comptexp', 'comptedest', 'montant', 'dateOper', 'statut'];
  virementsDS: MatTableDataSource<Virement>;
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.getVirements(); // == observable //
   // this.virementsDS.data = this.virements;
  }
  getVirements() {
    this.virementsService.getAllVirements().subscribe( virements => {
      this.virementsDS.data = this.virements = virements;

    });
  }
  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }
  openVirementForm(): void {
    const dialogRef = this.dialog.open(VirementFormComponent, {
      width: '500px',
      data: this.virements
      // virement: this.newVirement
    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('Subtask Dialog output:', data);
      this.virements.push(data);
      console.log(this.virements);
      this.virementsDS.data = this.virements;
      this.openSnackBar();
    });
  }


}
