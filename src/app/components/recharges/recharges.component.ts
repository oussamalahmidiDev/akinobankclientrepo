import { Component, OnInit } from "@angular/core";
import { RechargeFormComponent } from "../recharge-form/recharge-form.component";
// import { RechargesService } from 'src/app/services/recharges.service';
import { RechargesService } from "../../services/recharges.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Recharge } from "../../models/recharge";
import { Store, Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { RechargesState } from "../../states/recharges.state";
import { GetRecharges } from "../../actions/recharges.action";

@Component({
  selector: "app-recharges",
  templateUrl: "./recharges.component.html",
  styleUrls: ["./recharges.component.css"],
})
export class RechargesComponent implements OnInit {
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private rechargesService: RechargesService,
    private store: Store
  ) {}

  @Select(RechargesState.selectRecharges)
  recharges: Observable<Recharge[]>;
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
    this.recharges.subscribe((data) => {
      this.rechargesDS = new MatTableDataSource<Recharge>(data);
    });
    this.store.dispatch(new GetRecharges());
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
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
      if (data) this.openSnackBar("Recharge effectuée avec succés !");
    });
  }
}
