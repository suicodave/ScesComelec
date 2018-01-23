import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { OverviewComponent } from './overview/overview.component';
import { MyElectionsComponent } from './my-elections/my-elections.component';
import { SettingsComponent } from './settings/settings.component';
import { CandidacyRequestComponent } from './candidacy-request/candidacy-request.component';

const routes: Routes = [
  {
    path: '', component: IndexComponent, children: [
      {
        path: '', redirectTo: 'overview', pathMatch: 'full'
      },
      {
        path: 'overview', component: OverviewComponent
      },
      {
        path: 'my-elections', component: MyElectionsComponent
      },
      {
        path: 'settings', component: SettingsComponent
      },
      {
        path: 'candidacy-requests', component: CandidacyRequestComponent
      }
    ]
  },
  {
    path: 'auth', component: AuthComponent
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
