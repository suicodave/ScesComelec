import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { MyMaterialModule } from './my-material/my-material.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { IndexComponent } from './index/index.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';
import { OverviewComponent } from './overview/overview.component';
import { MyElectionsComponent } from './my-elections/my-elections.component';
import { SettingsComponent } from './settings/settings.component';
import { CandidacyRequestComponent } from './candidacy-request/candidacy-request.component';
import { AddElectionComponent } from './add-election/add-election.component';
import { AddPositionComponent } from './modals/add-position/add-position.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NotFoundComponent,
    AuthComponent,
    OverviewComponent,
    MyElectionsComponent,
    SettingsComponent,
    CandidacyRequestComponent,
    AddElectionComponent,
    AddPositionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule
  ],
  providers: [],
  entryComponents: [
    AddElectionComponent,
    AddPositionComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
