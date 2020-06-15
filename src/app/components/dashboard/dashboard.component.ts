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
import { ComptesState } from "../../states/comptes.state";
import { FetchComptes } from "../../actions/comptes.actions";
import { Session } from "../../models/session";
import { SessionsState } from "../../states/sessions.state";
import {
  GetSessions,
  AuthorizeSession,
  BlockSession,
  DeleteSession,
} from "../../actions/sessions.actions";
import { AuthService } from "../../services/auth.service";
import { map } from "rxjs/operators";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  isLoaded = true;
  constructor(private store: Store, public authService: AuthService) {}
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  // dataSource = ELEMENT_DATA;

  comptesDS: MatTableDataSource<Compte>;
  virementsDs: MatTableDataSource<Virement>;
  sessionsDs: MatTableDataSource<Session>;

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

  sessionColumns: string[] = [
    // "id",
    "browser",
    "os",
    "ip",
    "timestamp",
    "location",
    "state",
    "actions",
  ];

  @Select(VirementsState.selectSentVirements)
  sentVirements: Observable<Virement[]>;

  @Select(VirementsState.selectReceivedVirements)
  receivedVirements: Observable<Virement[]>;

  @Select(VirementsState.selectAllVirements)
  allVirements: Observable<Virement[]>;

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  @Select(ComptesState.selectComptes)
  comptes: Observable<Compte[]>;

  @Select(SessionsState.selectAllSessions)
  sessions: Observable<Session[]>;

  ngOnInit() {
    this.allVirements.subscribe(
      (data) => (this.virementsDs = new MatTableDataSource<Virement>(data))
    );
    this.comptes.subscribe(
      (data) => (this.comptesDS = new MatTableDataSource<Compte>(data))
    );
    this.sessions.subscribe(
      (data) => (this.sessionsDs = new MatTableDataSource<Session>(data))
    );
    this.store.dispatch(new GetSessions());
    this.store.dispatch(new FetchComptes());
    this.store.dispatch(new GetVirements());
  }

  authorize(session: Session) {
    if (confirm("Verifiez bien que cette session est éligible"))
      this.store.dispatch(new AuthorizeSession(session.id));
  }

  block(session: Session) {
    if (confirm("Voulez-vous continuez ?"))
      this.store.dispatch(new BlockSession(session.id));
  }

  delete(session: Session) {
    if (confirm("Voulez-vous continuez ?"))
      this.store.dispatch(new DeleteSession(session.id));
  }

  isSent(virement: Virement): Observable<boolean> {
    return this.sentVirements.pipe(
      map(
        (virements) =>
          virements.find((element) => element === virement) !== undefined
      )
    );
  }
}
