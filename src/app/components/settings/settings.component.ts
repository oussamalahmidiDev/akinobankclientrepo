import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Compte } from 'src/app/models/compte';
import { MatTableDataSource } from '@angular/material';

// const ELEMENT_DATA: Compte[] = [
//   { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
//   { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
//   { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
//   { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
// ];
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dataSource: MatTableDataSource<Compte>;

  isLoaded = false;

  constructor(private userService: UserService) {
      this.dataSource = new MatTableDataSource<Compte>();
   }

  currentUser: User;
  
  numberFormisVisible = false;
  emailFormisVisible = false;
  ngOnInit() {
    this.userService.getProfile()
    .subscribe(data => {
      this.currentUser = data;
      this.dataSource.data = data.comptes;
      this.isLoaded = true;
    });
  //  this.currentUser = this.userService.currentUser;
  }

  handlePhotoUpload ($event) {
    console.log($event.target.files);
  }
  displayedColumns: string[] = ['numeroCompte', 'intitule', 'solde', 'dateOperation','actions'];
  

}
