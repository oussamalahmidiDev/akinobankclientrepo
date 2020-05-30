import { Component, OnInit } from "@angular/core";
import { RechargeFormComponent } from "../recharge-form/recharge-form.component";
// import { RechargesService } from 'src/app/services/recharges.service';
import { RechargesService } from "../../services/recharges.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Recharge } from "../../models/recharge";

@Component({
  selector: "app-recharges",
  templateUrl: "./recharges.component.html",
  styleUrls: ["./recharges.component.css"],
})
export class RechargesComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private rechargesService: RechargesService
  ) {
    this.rechargesDS = new MatTableDataSource<Recharge>();
  }

  recharges: Recharge[];
  rechargesColumns: string[] = [
    "comptexp",
    "numTel",
    "montant",
    "operateur",
    "dateOper",
  ];
  rechargesDS: MatTableDataSource<Recharge>;
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.getVirements();
  }

  getVirements() {
    this.rechargesService.getAllRecharges().subscribe((recharges) => {
      this.rechargesDS.data = this.recharges = recharges;
    });
  }

  openSnackBar() {
    this._snackBar.open("Recharge ajoutée", "OK", {
      duration: 2000,
    });
  }
  openRechargeForm(): void {
    const dialogRef = this.dialog.open(RechargeFormComponent, {
      width: "500px",
      data: this.recharges,
      // virement: this.newVirement
    });
    dialogRef.afterClosed().subscribe((data) => {
      console.log("Subtask Dialog output:", data);
      this.recharges.push(data);
      console.log(this.recharges);
      this.rechargesDS.data = this.recharges;
      this.openSnackBar();
    });
  }
}
