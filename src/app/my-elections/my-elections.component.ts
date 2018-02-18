import { Component, OnInit, ViewChild } from '@angular/core';
import { ElectionService } from '../services/election.service';
import { ElectionCardComponent } from '../election-card/election-card.component';

@Component({
  selector: 'app-my-elections',
  templateUrl: './my-elections.component.html',
  styleUrls: ['./my-elections.component.scss']
})
export class MyElectionsComponent implements OnInit {
  @ViewChild('electionCard') electionCard: ElectionCardComponent;
  selectedElection;
  myPreparedElections = [];
  myActiveElections = [];
  myPublishedElections = [];
  isActiveElectionLoaded = false;
  isPreparedElectionLoaded = false;
  isPublishedElectionLoaded = false;
  constructor(private electionService: ElectionService) { }

  ngOnInit() {
    this.electionService.behaviorState.subscribe((res) => {
      this.loadContent();

    });
  }

  loadContent() {
    this.getPreparedElections(undefined, 'updated_at', 'desc');
    this.getActiveElections(undefined, 'updated_at', 'desc');
    this.getPublishedElections();
  }

  getPreparedElections(items?, orderBy?, orderValue?) {

    this.isPreparedElectionLoaded = false;
    this.electionService.getElections(1, undefined, undefined, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.myPreparedElections = res.data;

        this.isPreparedElectionLoaded = true;

      }
      );
  }

  getActiveElections(items?, orderBy?, orderValue?) {

    this.isActiveElectionLoaded = false;
    this.electionService.getElections(1, 1, undefined, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.myActiveElections = res.data;

        this.isActiveElectionLoaded = true;
      }
      );
  }

  getPublishedElections(items?, orderBy?, orderValue?) {
    this.isPublishedElectionLoaded = false;
    this.electionService.getElections(1, undefined, 1, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.myPublishedElections = res.data;

        this.isPublishedElectionLoaded = true;
      }
      );
  }

  onSelectElection(election) {
    this.selectedElection = election;
  }

  deleteElection() {
    this.selectedElection = undefined;
    this.electionService.behaviorSource.next(1);
  }

  updateElection() {
    this.selectedElection = undefined;
  }

}
