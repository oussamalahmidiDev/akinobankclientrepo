import { LayoutModule } from "@angular/cdk/layout";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatOptionModule } from "@angular/material/core";
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSliderModule } from "@angular/material/slider";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";
import { NgxsModule } from "@ngxs/store";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RechargeFormComponent } from "./components/recharge-form/recharge-form.component";
import { RechargesComponent } from "./components/recharges/recharges.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { VirementFormComponent } from "./components/virement-form/virement-form.component";
import { VirementsComponent } from "./components/virements/virements.component";
import { AvatarPipe } from "./pipes/avatar.pipe";
import { ProfileState } from "./states/profile.state";
import { VirementsState } from "./states/virements.state";
import { HomeComponent } from "./views/home/home.component";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    VirementsComponent,
    SettingsComponent,
    VirementFormComponent,
    RechargesComponent,
    RechargeFormComponent,
    WelcomePageComponent,
    HomeComponent,
    AvatarPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LayoutModule,
    MatToolbarModule,
    MatTableModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule,
    MatStepperModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,

    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,

    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot([ProfileState, VirementsState], {
      developmentMode: true,
    }),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}, // Add any data you wish to test if it is passed/used correctly
    },
  ],
  bootstrap: [AppComponent],
  entryComponents: [VirementFormComponent, RechargeFormComponent],
})
export class AppModule {}
