import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AddPositionComponent } from '../modals/add-position/add-position.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
  }

  addPosition() {
    this.dialog.open(AddPositionComponent, {
      width: '300px'
    });
  }

}
