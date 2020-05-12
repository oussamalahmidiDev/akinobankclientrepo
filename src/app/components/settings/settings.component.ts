import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Compte } from 'src/app/models/compte';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import {Demande} from "../../models/demande";
import { HttpEventType, HttpResponse, HttpEvent } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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

  @ViewChild('avatar') avatar: ElementRef;

  isLoaded = false;

  uploadProgress = 0;
  uploading = false;

  constructor(private userService: UserService, private snackBar: MatSnackBar) {
      this.dataSource = new MatTableDataSource<Compte>();
      this.demande = { nom: null, prenom: null, email: null };
   }

   openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  currentUser: User;

  demande: Demande;

  numberFormisVisible = false;
  emailFormisVisible = false;
  nomFormisVisible = false;
  prenomFormisVisible = false;
  ngOnInit() {
    this.userService.getProfile()
    .subscribe(data => {
      this.currentUser = data;
      this.currentUser.photo = environment.BASE_URL + "/api/avatar/" + data.photo;
      if (data.demande)
        this.demande = data.demande;
      this.dataSource.data = data.comptes;
      this.isLoaded = true;
    });
  //  this.currentUser = this.userService.currentUser;
  }

  sendDemande() {
    console.log(this.demande);
    this.userService.sendDemande(this.demande)
      .subscribe((data: Demande) => this.demande = data);
  }

  deleteDemande() {
    this.demande = { nom: null, prenom: null, email: null, id: null };
  }



  handlePhotoUpload ($event) {
    const image = $event.target.files[0];
    this.userService.uploadImage(image)
    .subscribe(
      (data: HttpEvent<any>)=> {
        console.log(data);
        if (data.type === HttpEventType.UploadProgress) {
          this.uploading = true;
          this.uploadProgress = Math.round(100 * data.loaded / data.total);
        }
        else if (data.type === HttpEventType.Response) {
          this.openSnackBar("Photo de profil a été chargée avec succès !");
          this.currentUser.photo = data.body.link;
          this.uploading = false;
        }

      },
      error => {
        console.log(error)
      }
    );
  }
  displayedColumns: string[] = ['numeroCompte', 'intitule', 'solde', 'dateOperation','actions'];


}
