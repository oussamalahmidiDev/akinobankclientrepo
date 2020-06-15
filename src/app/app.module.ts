import { LayoutModule } from "@angular/cdk/layout";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from "@angular/common/http";
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
import { MatBadgeModule } from "@angular/material/badge";
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
import { RequestsInterceptor } from "./requests.interceptor";
import { RechargesState } from "./states/recharges.state";

import { TwoFactorQRComponent } from "./forms/two-factor-qr/two-factor-qr.component";
import { SafePipe } from "./pipes/safe.pipe";
import { CompteBlockFormComponent } from "./forms/compte-block-form/compte-block-form.component";
import { ComptesState } from "./states/comptes.state";
import { CompteSuspendFormComponent } from "./forms/compte-suspend-form/compte-suspend-form.component";
import { NgModule } from "@angular/core";
import { SessionsState } from "./states/sessions.state";
import { ChangerCodeComponent } from "./components/forms/changer-code/changer-code.component";
import { ActivitiesComponent } from "./components/activities/activities.component";
import { MatPaginatorModule } from "@angular/material/paginator";
import { VirementConfirmationComponent } from "./components/forms/virement-confirmation/virement-confirmation.component";
import { NgxSplitInputModule } from "ngx-splitinput";
import { CreditCardPipe } from "./Pipes/credit-card.pipe";
import { CleanInputDirective } from "./directives/clean-input.directive";
// import { TrimDirective } from './directives/trim.directive';
import { InputTrimModule } from "ng2-trim-directive";
import { NotificationComponent } from "./components/notification/notification.component";
import { WebsocketService } from "./services/websocket.service";
import {
  InjectableRxStompConfig,
  RxStompService,
  rxStompServiceFactory,
  StompConfig,
  StompRService,
} from "@stomp/ng2-stompjs";
import { NotificationDrawerComponent } from "./components/notification-drawer/notification-drawer.component";
import { NotificationsState } from "./states/notifications.state";

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
    TwoFactorQRComponent,
    SafePipe,
    CompteBlockFormComponent,
    CompteSuspendFormComponent,
    ChangerCodeComponent,
    ActivitiesComponent,
    VirementConfirmationComponent,
    CreditCardPipe,
    CleanInputDirective,
    NotificationComponent,
    NotificationDrawerComponent,
    // TrimDirective,
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
    MatPaginatorModule,
    NgxSplitInputModule,
    InputTrimModule,
    MatBadgeModule,
    HttpClientXsrfModule.withOptions({
      cookieName: "XSRF-TOKEN",
      headerName: "X-XSRF-TOKEN",
    }),

    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,

    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsModule.forRoot(
      [
        ProfileState,
        VirementsState,
        RechargesState,
        ComptesState,
        SessionsState,
        NotificationsState,
      ],
      {
        developmentMode: true,
      }
    ),
  ],
  providers: [
    StompRService,
    // {
    //   provide: InjectableRxStompConfig,
    //   useValue: StompConfig,
    // },
    // {
    //   provide: RxStompService,
    //   useFactory: rxStompServiceFactory,
    //   deps: [InjectableRxStompConfig],
    // },
    WebsocketService,
    {
      provide: MatDialogRef,
      useValue: {},
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}, // Add any data you wish to test if it is passed/used correctly
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
