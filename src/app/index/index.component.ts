import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddElectionComponent } from '../add-election/add-election.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
  }


  addElectionDialog() {
    this.dialog.open(AddElectionComponent, {
      width: '60%'
    });
  }

}
