import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddCandidateComponent } from '../modals/add-candidate/add-candidate.component';
import { AddPositionComponent } from '../modals/add-position/add-position.component';
import { AddPartyComponent } from '../modals/add-party/add-party.component';
import { CandidateService } from '../services/candidate.service';
import { PositionService } from '../services/position.service';
import { PartylistService } from '../services/partylist.service';
import { ElectionService } from '../services/election.service';
import { DeleteComponent } from '../modals/delete/delete.component';
import { ShowCandidateComponent } from '../modals/show-candidate/show-candidate.component';
@Component({
  selector: 'app-election-card',
  templateUrl: './election-card.component.html',
  styleUrls: ['./election-card.component.scss']
})
export class ElectionCardComponent implements OnInit, OnChanges {
  @Input('election') election;
  @Output() onDelete = new EventEmitter();
  audience;
  schoolYear;
  numberOfStudents;
  accumulatedVotes;
  candidates;
  positions;
  partylists;
  isCandidateLoading = false;
  isPartylistLoading = false;
  isPositionLoading = false;
  serviceClasses = [
    this.candidateService,
    this.positionService,
    this.partylistService,
    this.electionService
  ];
  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private candidateService: CandidateService, private positionService: PositionService, private partylistService: PartylistService, private electionService: ElectionService) { }

  ngOnInit() {

  }
  ngOnChanges() {
    this.loadContents();

    this.positionService.behaviorState.subscribe(
      (res) => {
        this.getPositions(this.election.id);
      }
    );
    this.partylistService.behaviorState.subscribe(
      (res) => {
        this.getPartylist(this.election.id);
      }
    );
    this.candidateService.behaviorState.subscribe(
      (res) => {
        this.getCandidates(this.election.id);
      }
    );
  }

  loadContents() {
    this.audience = this.election.departments.map(dep => dep.name).join(', ');
    this.schoolYear = this.election.school_year;
    this.numberOfStudents = this.election.number_of_students;
    this.accumulatedVotes = this.election.accumulated_votes;
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

  addPosition(toUpdate = false, position?) {
    this.dialog.open(AddPositionComponent, {
      width: '450px',
      data: {
        election: this.election,
        toUpdate: toUpdate,
        position: position
      }
    });
  }

  addParty(toUpdate = false, partylist?) {
    this.dialog.open(AddPartyComponent, {
      width: '450px',
      data: {
        election: this.election,
        toUpdate: toUpdate,
        partylist: partylist
      }
    });
  }

  getCandidates(electionId, items?, orderBy?, orderValue?) {
    this.isCandidateLoading = true;
    this.candidateService.getCandidates(electionId, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.candidates = res.data;
        this.isCandidateLoading = false;
      }
      );
  }

  getPositions(electionId, items?, orderBy?, orderValue?) {
    this.isPositionLoading = true;
    this.positionService.getPositions(electionId, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.positions = res.data;
        this.isPositionLoading = false;

      }
      );
  }

  getPartylist(electionId, items?, orderBy?, orderValue?) {
    this.isPartylistLoading = true;
    this.partylistService.getPartylist(electionId, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.partylists = res.data;
        this.isPartylistLoading = false;
      }
      );
  }



  candidateInfo(candidate) {

    this.dialog.open(ShowCandidateComponent, {
      width: '70%',
      data: {
        election: this.election,
        candidate: candidate,
        panelClass: 'candidate-profile'
      }
    });

  }

  delete(serviceClass: any, id, deleteSubject) {

    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '450px',
      data: {
        election: this.election,
        serviceClass: serviceClass,
        id: id,
        deleteSubject: deleteSubject
      }
    });

    const deletedElection = dialogRef.componentInstance.onElectionDeleted.subscribe((res) => {
      this.onDelete.emit();
    });

  }

}
