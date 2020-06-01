import { Component, OnInit } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { UserService } from "../../services/user.service";
import { Compte } from "../../models/compte";
import { Virement } from "../../models/virement";
import { Store, Select } from "@ngxs/store";
import { GetVirements } from "../../actions/virements.action";
import { Observable } from "rxjs";
import { VirementsState } from "../../states/virements.state";
import { User } from "../../models/user";
import { ProfileState } from "../../states/profile.state";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  isLoaded = true;
  constructor(private store: Store) {}
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  // dataSource = ELEMENT_DATA;

  comptesDS: MatTableDataSource<Compte>;
  virementsDs: MatTableDataSource<Virement>;

  compteColumns: string[] = [
    "numeroCompte",
    "intitule",
    "solde",
    "dateOperation",
  ];
  mesComptes: Compte[] = [];

  virementColumns: string[] = [
    "id",
    "comptexp",
    "comptedest",
    "montant",
    "dateOper",
    "statut",
  ];

  @Select(VirementsState.selectVirements)
  mesVirements: Observable<Virement[]>;

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  ngOnInit() {
    this.mesVirements.subscribe(
      (data) => (this.virementsDs = new MatTableDataSource<Virement>(data))
    );
    this.currentUser.subscribe(
      (data) => (this.comptesDS = new MatTableDataSource<Compte>(data.comptes))
    );

    this.store.dispatch(new GetVirements());
  }
}
