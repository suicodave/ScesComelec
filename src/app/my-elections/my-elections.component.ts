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
  constructor(private electionService: ElectionService) { }

  ngOnInit() {
    this.electionService.behaviorState.subscribe((res) => {
      this.loadContent();
      console.log('changed');

    });
  }

  loadContent() {
    this.getPreparedElections();
    this.getActiveElections();
  }

  getPreparedElections(items?, orderBy?, orderValue?) {
    this.electionService.getElections(1, undefined, undefined, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.myPreparedElections = res.data;

      }
      );
  }

  getActiveElections(items?, orderBy?, orderValue?) {
    this.electionService.getElections(1, 1, undefined, items, orderBy, orderValue)
      .subscribe(
      (res: any) => {
        this.myActiveElections = res.data;

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

}
