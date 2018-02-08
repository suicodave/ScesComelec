import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-show-candidate',
  templateUrl: './show-candidate.component.html',
  styleUrls: ['./show-candidate.component.scss']
})
export class ShowCandidateComponent implements OnInit {
  election;
  candidate;
  constructor( @Inject(MAT_DIALOG_DATA) private data) { }

  ngOnInit() {
    this.election = this.data.election;
    this.candidate = this.data.candidate;
    console.log(this.candidate);
  }

}
