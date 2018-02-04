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
import { ElectionCardComponent } from './election-card/election-card.component';
import { AddCandidateComponent } from './modals/add-candidate/add-candidate.component';
import { AddPartyComponent } from './modals/add-party/add-party.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { CandidateService } from './services/candidate.service';
import { ElectionService } from './services/election.service';
import { PartylistService } from './services/partylist.service';
import { PositionService } from './services/position.service';

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
    AddPositionComponent,
    ElectionCardComponent,
    AddCandidateComponent,
    AddPartyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MyMaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
  ],
  providers: [
    AuthService,
    AuthGuard,
    CandidateService,
    ElectionService,
    PartylistService,
    PositionService
  ],
  entryComponents: [
    AddElectionComponent,
    AddPositionComponent,
    AddCandidateComponent,
    AddPartyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
