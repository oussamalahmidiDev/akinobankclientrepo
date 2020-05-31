import { Component, OnInit, Injectable } from "@angular/core";
import { VirementFormComponent } from "../virement-form/virement-form.component";
import { VirementsService } from "../../services/virements.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Virement } from "../../models/virement";
import { Select, Store } from "@ngxs/store";
import { VirementsState } from "../../states/virements.state";
import { Observable } from "rxjs";
import { GetVirements } from "../../actions/virements.action";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Injectable()
@Component({
  selector: "app-virements",
  templateUrl: "./virements.component.html",
  styleUrls: ["./virements.component.css"],
})
export class VirementsComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private virementsService: VirementsService,
    private store: Store
  ) {
    //this.virementsDS = new MatTableDataSource<Virement>();
  }

  @Select(VirementsState.selectVirements)
  virements: Observable<Virement[]>;

  virementColumns: string[] = [
    "id",
    "comptexp",
    "comptedest",
    "montant",
    "dateOper",
    "statut",
  ];
  virementsDS: MatTableDataSource<Virement>;
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.getVirements(); // == observable //
    // this.virementsDS.data = this.virements;
  }
  getVirements() {
    this.virements.subscribe(
      (data) => (this.virementsDS = new MatTableDataSource<Virement>(data))
    );
    this.store.dispatch(new GetVirements());
    // this.virementsService.getAllVirements().subscribe((virements) => {
    //   this.virementsDS.data = this.virements = virements;
    // });
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 2000,
    });
  }
  openVirementForm(): void {
    const dialogRef = this.dialog.open(VirementFormComponent, {
      width: "500px",
      data: this.virements,
      // virement: this.newVirement
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.openSnackBar("Le virement a été ajouté avec succés !");
    });
  }
}
