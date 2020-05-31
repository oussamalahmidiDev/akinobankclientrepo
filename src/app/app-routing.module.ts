import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import {RouterOutlet, Routes} from '@angular/router';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { VirementsComponent } from "./components/virements/virements.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { RechargesComponent } from "./components/recharges/recharges.component";
import { AuthenticatedGuard } from "./guards/authenticated.guard";
import { WelcomePageComponent } from "./views/welcome-page/welcome-page.component";
import { HomeComponent } from "./views/home/home.component";
import { ProfileServiceResolver } from "./resolvers/profile.resolver";
import { GuestGuard } from "./guards/guest.guard";

const routes: Routes = [
  {
    path: "home",
    component: HomeComponent,
    resolve: { profile: ProfileServiceResolver },
    canActivate: [AuthenticatedGuard],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthenticatedGuard],
      },
      {
        path: "virements",
        component: VirementsComponent,
        canActivate: [AuthenticatedGuard],
      },
      {
        path: "settings",
        component: SettingsComponent,
        canActivate: [AuthenticatedGuard],
      },
      {
        path: "recharges",
        component: RechargesComponent,
        canActivate: [AuthenticatedGuard],
      },
      { path: "**", redirectTo: "dashboard", pathMatch: "full" },
    ],
  },

  // { path: 'home', component: HomeComponent,  },
  // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: "",
    component: WelcomePageComponent,
    canActivate: [GuestGuard],
  },
];
// const routes: Routes = [
//   {
//     path: 'home',
//     component: HomeComponent,
//     canActivate: [AuthenticatedGuard],
//     children: [
//       { path: 'dashboard', component: DashboardComponent,  },
//       { path: 'virements', component: VirementsComponent,  },
//       { path: 'settings', component: SettingsComponent,  },
//       { path: 'recharges', component: RechargesComponent,  },
//     ]
//   },

//   // { path: 'home', component: HomeComponent,  },
//   // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
//   { path: '', component: WelcomePageComponent },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
