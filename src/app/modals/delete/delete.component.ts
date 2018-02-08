import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef } from '@angular/material';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
  serviceClass;
  id;
  election;
  deleteSubject;
  isDeleting = false;
  constructor( @Inject(MAT_DIALOG_DATA) private data, private snackBar: MatSnackBar, private dialogRef: MatDialogRef<DeleteComponent>) { }

  onElectionDeleted = new EventEmitter();
  ngOnInit() {

    this.serviceClass = this.data.serviceClass;
    this.id = this.data.id;
    this.election = this.data.election;
    this.deleteSubject = this.data.deleteSubject;
    console.log(this.deleteSubject);


  }

  confirmDelete() {
    this.isDeleting = true;
    this.serviceClass['delete'](this.id, this.election.id).subscribe(
      (res) => {
        this.snackBar.open(res.externalMessage, 'Okay', {
          duration: 5000
        });
        this.serviceClass['behaviorSource'].next(1);

      },
      (err) => {
        console.log(err);

      },
      () => {
        if (this.deleteSubject == 'election') {
          this.onElectionDeleted.emit(1);
        }
        this.isDeleting = false;
        this.dialogRef.close();
      }
    );
  }

}
