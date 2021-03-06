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
import { CompteBlockFormComponent } from "../../forms/compte-block-form/compte-block-form.component";
import { FetchComptes } from "../../actions/comptes.actions";
import { ComptesState } from "../../states/comptes.state";
import { CompteSuspendFormComponent } from "../../forms/compte-suspend-form/compte-suspend-form.component";
import { ChangerCodeComponent } from "../forms/changer-code/changer-code.component";
import { CompteActivateFormComponent } from "../forms/compte-activate-form/compte-activate-form.component";

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

  displayedColumns: string[] = [
    "numeroCompte",
    "intitule",
    "solde",
    "dateOperation",
    "status",
    "actions",
  ];

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

  @Select(ComptesState.selectComptes)
  comptes: Observable<Compte[]>;

  demande: Demande;

  numberFormisVisible = false;
  emailFormisVisible = false;
  nomFormisVisible = false;
  prenomFormisVisible = false;
  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      adresse: [""],
      numeroTelephone: [""],
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

    this.store.dispatch(new FetchComptes());

    this.comptes.subscribe(
      (data) => (this.dataSource = new MatTableDataSource<Compte>(data))
    );

    this.currentUser.subscribe((user) => {
      if (user) {
        this.profileForm.patchValue(user);
        this.dataSource = new MatTableDataSource<Compte>(user.comptes);
      }
    });
  }

  openQRCodeModal() {
    if (
      !confirm(
        "Si vous avez déjà activé l'authentification à deux facteurs sur un autre appareil, les codes ne seront plus valides. Voulez-vous continuez ?"
      )
    )
      return;

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

  openChangerCodeForm(selectedCompte: Compte) {
    const dialogRef = this.dialog.open(ChangerCodeComponent, {
      width: "500px",
      data: selectedCompte,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.openSnackBar(
          "Votre demande de bloquage a été envoyée aux agent de votre banque."
        );
    });
  }

  openCompteBlockForm(selectedCompte: Compte) {
    const dialogRef = this.dialog.open(CompteBlockFormComponent, {
      width: "500px",
      data: selectedCompte,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.openSnackBar(
          "Votre demande de bloquage a été envoyée aux agent de votre banque."
        );
    });
  }

  openCompteSuspendForm(selectedCompte: Compte) {
    const dialogRef = this.dialog.open(CompteSuspendFormComponent, {
      width: "500px",
      data: selectedCompte,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.openSnackBar(
          "Votre demande de suspension a été envoyée aux agent de votre banque."
        );
    });
  }

  activateCompte(compte: Compte) {
    const dialogRef = this.dialog.open(CompteActivateFormComponent, {
      width: "500px",
      data: compte,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data)
        this.openSnackBar(
          compte.oldStatut === "ACTIVE"
            ? "Le compte a été réactivé"
            : "Votre demande d'activation a été envoyée aux agent de votre banque."
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
}
