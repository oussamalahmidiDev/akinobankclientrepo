import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";

import { Demande } from "../../models/demande";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { Compte } from "../../models/compte";
import { environment } from "../../../environments/environment";
import { Select, Store } from "@ngxs/store";
import { ProfileState } from "../../states/profile.state";
import { Observable } from "rxjs";
import {
  UpdatePhoto,
  UnsetPhoto,
  UpdateProfile,
} from "../../actions/profile.actions";
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { TwoFactorQRComponent } from "../../forms/two-factor-qr/two-factor-qr.component";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"],
})
export class SettingsComponent implements OnInit {
  dataSource: MatTableDataSource<Compte>;

  // @ViewChild("avatar") avatar: ElementRef;

  isLoaded = true;

  hide = true;

  profileForm: FormGroup;
  compteForm: FormGroup;
  compteFormErrors: string[];

  uploadProgress = 0;
  uploading = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private store: Store,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {
    this.demande = { nom: null, prenom: null, email: null };
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  @Select(ProfileState.selectProfile)
  currentUser: Observable<User>;

  demande: Demande;

  numberFormisVisible = false;
  emailFormisVisible = false;
  nomFormisVisible = false;
  prenomFormisVisible = false;
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      adresse: ["", Validators.required],
      numeroTelephone: ["", Validators.required],
      email: ["", Validators.required],
    });

    this.compteForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      passwords: this.formBuilder.group(
        {
          newPassword: ["", [Validators.required, Validators.minLength(6)]],
          newPasswordConf: ["", [Validators.required, Validators.minLength(6)]],
        },
        { validators: this.passwordMatching }
      ),
    });

    this.currentUser.subscribe((user) => {
      this.profileForm.patchValue(user);
      this.dataSource = new MatTableDataSource<Compte>(user.comptes);
    });

    /*   this.userService.getProfile().subscribe((data) => {
      this.currentUser = data;
      this.currentUser.photo =
        environment.BASE_URL + "/api/avatar/" + data.photo;
      if (data.demande) this.demande = data.demande;
      this.dataSource.data = data.comptes;
      this.isLoaded = true;
    });
   this.currentUser = this.userService.currentUser; */
  }

  openQRCodeModal() {
    const dialogRef = this.dialog.open(TwoFactorQRComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.openSnackBar(
          "L'authentification à 2 facteurs a été activée pour votre compte !"
        );
    });
  }

  onSubmitProfileForm() {
    console.log(this.profileForm.value);
    this.store.dispatch(new UpdateProfile(this.profileForm.value));
  }

  sendDemande() {
    console.log(this.demande);
    // this.userService
    //   .sendDemande(this.demande)
    //   .subscribe((data: Demande) => (this.demande = data));
  }

  passwordMatching(c: AbstractControl): { invalid: boolean } {
    if (c.get("newPassword").value !== c.get("newPasswordConf").value) {
      return { invalid: true };
    }
  }

  deleteDemande() {
    this.demande = { nom: null, prenom: null, email: null, id: null };
  }

  handlePhotoUpload($event) {
    const image = $event.target.files[0];
    this.userService.uploadImage(image).subscribe(
      (data: HttpEvent<any>) => {
        console.log(data);
        if (data.type === HttpEventType.UploadProgress) {
          this.uploading = true;
          this.uploadProgress = Math.round((100 * data.loaded) / data.total);
        } else if (data.type === HttpEventType.Response) {
          this.store.dispatch(new UpdatePhoto(data.body.link));
          this.openSnackBar("Photo de profil a été chargée avec succès !");
          this.uploading = false;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmitCompteForm() {
    this.compteFormErrors = [];
    console.log(this.compteForm);
    console.log(this.compteForm.get("passwords"));
    this.userService
      .changePassword({
        oldPassword: this.compteForm.value.oldPassword,
        newPassword: this.compteForm.get("passwords").value.newPassword,
        confPassword: this.compteForm.get("passwords").value.newPasswordConf,
      })
      .subscribe(
        (data) => {
          this.openSnackBar("Le mot de passe a été changé avec succès !");
        },
        (error) => {
          console.log(error.error);
          this.compteFormErrors.push(error.error.message);
        }
      );
  }

  handlePhotoDelete() {
    this.store.dispatch(new UnsetPhoto());
  }
  displayedColumns: string[] = [
    "numeroCompte",
    "intitule",
    "solde",
    "dateOperation",
    "actions",
  ];
}
