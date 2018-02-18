import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { ElectionService } from '../../services/election.service';

@Component({
  selector: 'app-update-election',
  templateUrl: './update-election.component.html',
  styleUrls: ['./update-election.component.scss']
})
export class UpdateElectionComponent implements OnInit {
  method;
  value;
  election;
  isUpdating = false;
  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) private data, private snackbar: MatSnackBar, private dialogref: MatDialogRef<UpdateElectionComponent>, private electionService: ElectionService) { }

  ngOnInit() {
    this.method = this.data.method;
    this.value = this.data.value;
    this.election = this.data.election;
  }
  confirmUpdate() {
    this.isUpdating = true;
    this.electionService.updateElection(this.election.id, this.method, this.value).subscribe(
      (res: any) => {
        this.electionService.behaviorSource.next(1);
        this.dialogref.close();
        this.isUpdating = false;
        this.snackbar.open(res.externalMessage, 'Okay', {
          duration: 5000
        });
      }
    );
  }
}
