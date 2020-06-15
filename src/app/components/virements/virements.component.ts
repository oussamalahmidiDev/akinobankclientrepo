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
import {
  GetVirements,
  ConfirmVirementReceipt,
} from "../../actions/virements.action";
import { VirementConfirmationComponent } from "../forms/virement-confirmation/virement-confirmation.component";
import { tap, map } from "rxjs/operators";

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
  ) {}

  @Select(VirementsState.selectSentVirements)
  sentVirements: Observable<Virement[]>;

  @Select(VirementsState.selectReceivedVirements)
  receivedVirements: Observable<Virement[]>;

  @Select(VirementsState.selectAllVirements)
  allVirements: Observable<Virement[]>;

  virementColumns: string[] = [
    "id",
    "comptexp",
    "comptedest",
    "montant",
    "dateOper",
    "statut",
  ];
  virementsDS: MatTableDataSource<Virement>;
  ngOnInit() {
    this.getVirements(); // == observable //
  }
  getVirements() {
    this.allVirements.subscribe((data) => {
      this.virementsDS = new MatTableDataSource<Virement>(data);
      if (data)
        data.forEach((virement) => {
          if (virement.statut === "CONFIRMED" && !this.isSent(virement)) {
            this.confirmReceipt(virement.id);
          }
        });
    });
    this.store.dispatch(new GetVirements());
  }
  openSnackBar(message: string) {
    this._snackBar.open(message, "OK", {
      duration: 2000,
    });
  }
  openVirementForm(): void {
    const dialogRef = this.dialog.open(VirementFormComponent, {
      width: "500px",
      // data: this.virements,
      // virement: this.newVirement
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.openSnackBar("Le virement a été ajouté avec succés !");
    });
  }

  isSent(virement: Virement): Observable<boolean> {
    return this.sentVirements.pipe(
      map(
        (virements) =>
          virements.find((element) => element === virement) !== undefined
      )
    );
  }

  confirmReceipt(id: number) {
    this.store.dispatch(new ConfirmVirementReceipt(id)).subscribe(
      () => this.openSnackBar("L'accusé de réception a été envoyé"),
      (error) => alert(error.error.message)
    );
  }

  openVirementConfirmationForm(virement: Virement) {
    const dialogRef = this.dialog.open(VirementConfirmationComponent, {
      width: "500px",
      data: virement,
    });
  }
}
