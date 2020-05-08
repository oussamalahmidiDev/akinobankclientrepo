import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { MatSliderModule } from '@angular/material/slider';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatDialog, MatDialogModule, MatTableModule, MatSnackBarModule, MatStepperModule, MatDialogRef, MAT_DIALOG_DATA, MatOptionModule, MatSelectModule, MatAutocompleteModule, MatSpinner, MatProgressSpinnerModule } from '@angular/material';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VirementsComponent } from './components/virements/virements.component';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RechargesComponent } from './components/recharges/recharges.component';
import { RechargeFormComponent } from './components/recharge-form/recharge-form.component';
import { WelcomePageComponent } from './views/welcome-page/welcome-page.component';
import { HomeComponent } from './views/home/home.component';

import { VirementFormComponent } from './components/virement-form/virement-form.component';
import { HttpClientModule } from '@angular/common/http';

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
    HomeComponent
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
    ReactiveFormsModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  }, {
    provide: MAT_DIALOG_DATA,
    useValue: {} // Add any data you wish to test if it is passed/used correctly
  }],
  bootstrap: [AppComponent],
  entryComponents: [VirementFormComponent, RechargeFormComponent]
})
export class AppModule { }
