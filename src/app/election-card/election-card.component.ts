import { Component, OnInit, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
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
import * as FileSaver from 'file-saver';
import { UpdateElectionComponent } from '../modals/update-election/update-election.component';
declare var Pusher: any;
@Component({
  selector: 'app-election-card',
  templateUrl: './election-card.component.html',
  styleUrls: ['./election-card.component.scss']
})
export class ElectionCardComponent implements OnInit, OnChanges {
  @Input('election') election;
  @Output() onDelete = new EventEmitter();
  @Output() onUpdate = new EventEmitter();
  pusher;
  audience;
  schoolYear;
  numberOfStudents;
  accumulatedVotes;
  remainingVotes;
  candidates;
  positions;
  partylists;
  isCandidateLoading = false;
  isPartylistLoading = false;
  isPositionLoading = false;
  isRankingLoaded = false;
  serviceClasses = [
    this.candidateService,
    this.positionService,
    this.partylistService,
    this.electionService
  ];
  rankings;
  isDeletable;
  isDownloadingStudent = false;
  isDownloadingRanking = false;
  isUpdatingElection = false;
  // tslint:disable-next-line:max-line-length
  constructor(private snackbar: MatSnackBar, private dialog: MatDialog, private candidateService: CandidateService, private positionService: PositionService, private partylistService: PartylistService, private electionService: ElectionService, private cd: ChangeDetectorRef) { }

  ngOnInit() {

  }
  ngOnChanges() {
    this.loadContents();
    this.initPusher();
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
    this.getRankings(this.election.id);
  }

  loadContents() {
    console.log(this.election);

    this.isDeletable = (!this.election.is_active && !this.election.is_published);
    this.audience = this.election.departments.map(dep => dep.name).join(', ');
    this.schoolYear = this.election.school_year;
    this.numberOfStudents = this.election.number_of_students;
    this.accumulatedVotes = this.election.accumulated_votes;
    this.remainingVotes = this.election.remaining_votes;
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

  getRankings(electionId) {
    this.isRankingLoaded = false;
    this.electionService.candidateStanding(this.election.id).subscribe((res: any) => {
      this.rankings = res.data;
      this.isRankingLoaded = true;
    });
  }

  generateStudentStatusCSV() {

    this.isDownloadingStudent = true;
    this.electionService.voterStatus(this.election.id).subscribe((res: any) => {
      const election = res.election;
      const students = res.data;

      const meta = [
        `Election ID, ${election.id}`,
        `Description, ${election.description}`,
        `School Year, ${election.school_year.name}`,
        '',
        'Fullname, Vote Entries'
      ];
      const transformStudent = students.map((student) => {
        return `"${student.name}",${student.vote}`;
      });

      meta.push(transformStudent.join('\n').toString());
      const output = meta.join('\n').toString();



      const blob = new Blob([output], { type: 'text/csv;charset=utf-8' });

      const fileSaver = FileSaver;
      fileSaver.saveAs(blob, `Election-${election.id}-${election.school_year.name}.csv`);
      this.isDownloadingStudent = false;
    });
  }

  generateRankingCSV() {
    const election = this.election;
    this.isDownloadingRanking = true;
    const electionMeta = [
      `Election ID, ${election.id}`,
      `Description, ${election.description}`,
      `School Year, ${election.school_year.name}`,
      '',
    ];
    const transformRanking = this.rankings.map((rank) => {
      const data = [
        `Position, ${rank.name}`,
        'Fullname,Votes Gathered'
      ];
      const transformCandidiate = rank.candidates.map((candidate) => {
        return `${candidate.full_name},${candidate.votes}`;
      });
      data.push(transformCandidiate.join('\n').toString());
      return data.join('\n').toString();
    });

    electionMeta.push(transformRanking.join('\n\n').toString());

    const output = electionMeta.join('\n').toString();
    const blob = new Blob([output], { type: 'text/csv;charset=utf-8' });
    const fileSaver = FileSaver;
    fileSaver.saveAs(blob, `Election-${this.election.id}-${this.election.school_year.name}.csv`);
    this.isDownloadingRanking = false;
  }

  candidateInfo(candidate) {

    this.dialog.open(ShowCandidateComponent, {
      width: '450px',
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

  updateElection(method, value) {
    this.isUpdatingElection = true;
    const ref = this.dialog.open(UpdateElectionComponent, {
      width: '450px',
      data: {
        method: method,
        value: value,
        election: this.election
      }
    });

    ref.afterClosed().subscribe(() => {
      this.isUpdatingElection = false;
      this.onUpdate.emit();
    });
  }

  initPusher() {
    Pusher.logToConsole = true;


    this.pusher = new Pusher('4051662bb310056f8c60', {
      cluster: 'eu',
      encrypted: true
    });

    const depIds = this.election.departments.map((item) => {
      return item.id;
    });


    for (const id of depIds) {

      this.pusher.subscribe(`vote${id}sy${this.election.school_year.id}`);
    }


    this.pusher.bind(`vote${this.election.id}`, (data) => {
      console.log(data);

      this.rankings = data.meta.standing;
      this.accumulatedVotes = data.meta.election.accumulated_votes;
      this.remainingVotes = data.meta.election.remaining_votes;
      this.cd.detectChanges();
    });
  }

}
