import { Component, OnInit } from '@angular/core';
import { Virement } from 'src/app/models/virement';
import { Compte } from 'src/app/models/compte';
import { UserService } from 'src/app/services/user.service';
import { MatTableDataSource } from '@angular/material';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  isLoaded = false;
  constructor(private service: UserService) {
    this.comptesDS = new MatTableDataSource<Compte>();
   }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  comptesDS: MatTableDataSource<Compte>;
  compteColumns: string[] = ['numeroCompte', 'intitule', 'solde', 'dateOperation'];
  mesComptes: Compte[] = [
  ];

  virementColumns: string[] = ['id', 'comptexp', 'comptedest', 'montant', 'dateOper', 'statut'];
  mesVirements: Virement[] = [
    { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
    { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
    { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
  ]
  ngOnInit() {
    this.service.getProfile()
    .subscribe(data => {
      this.mesComptes = data.comptes;
      this.comptesDS.data = data.comptes;
      this.isLoaded = true;
    })
  }

}
