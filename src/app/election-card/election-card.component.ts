import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddCandidateComponent } from '../modals/add-candidate/add-candidate.component';
import { AddPositionComponent } from '../modals/add-position/add-position.component';
import { AddPartyComponent } from '../modals/add-party/add-party.component';
import { CandidateService } from '../services/candidate.service';
import { PositionService } from '../services/position.service';
import { PartylistService } from '../services/partylist.service';
@Component({
  selector: 'app-election-card',
  templateUrl: './election-card.component.html',
  styleUrls: ['./election-card.component.scss']
})
export class ElectionCardComponent implements OnInit, OnChanges {
  @Input('election') election;

  audience;
  schoolYear;
  numberOfStudents;
  accumulatedVotes;
  candidates;
  positions;
  partylists;
  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private candidateService: CandidateService, private positionService: PositionService, private partylistService: PartylistService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    this.loadContents();
  }

  loadContents() {
    this.audience = this.election.departments.map(dep => dep.name).join(', ');
    this.schoolYear = this.election.school_year;
    this.numberOfStudents = this.election.number_of_students;
    this.accumulatedVotes = this.election.accumulated_votes;
    this.getCandidates(this.election.id);
    this.getPositions(this.election.id);
    this.getPartylist(this.election.id);
  }

  addCandidate() {
    this.dialog.open(AddCandidateComponent, {
      width: '100%',
      data: {
        election: this.election,
        positions: this.positions,
        partylists: this.partylists
      }
    });
  }

  addPosition() {
    this.dialog.open(AddPositionComponent, {
      width: '450px',
      data: {
        election: this.election
      }
    });
  }

  addParty() {
    this.dialog.open(AddPartyComponent, {
      width: '450px',
      data: {
        election: this.election
      }
    });
  }

  getCandidates(electionId, items?, orderBy?, orderValue?) {
    this.candidateService.getCandidates(electionId, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.candidates = res.data;
        console.log(this.candidates);

      }
      );
  }

  getPositions(electionId, items?, orderBy?, orderValue?) {
    this.positionService.getPositions(electionId, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.positions = res.data;
        console.log(this.positions);

      }
      );
  }

  getPartylist(electionId, items?, orderBy?, orderValue?) {
    this.partylistService.getPartylist(electionId, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.partylists = res.data;
        console.log(this.partylists);

      }
      );
  }

}
