import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PositionService } from '../../services/position.service';

@Component({
  selector: 'app-add-position',
  templateUrl: './add-position.component.html',
  styleUrls: ['./add-position.component.scss']
})
export class AddPositionComponent implements OnInit {
  positionForm: FormGroup;
  isToUpdate;
  position;
  isProcessing = false;
  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) private data, private fb: FormBuilder, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddPositionComponent>, private positionService: PositionService) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.isToUpdate = this.data.toUpdate;

    this.positionForm = this.fb.group({
      posName: ['', [Validators.required]],
      winNum: ['', [Validators.required]]
    });

    if (this.isToUpdate) {
      this.position = this.data.position;
      this.positionForm.patchValue({
        posName: this.position.name,
        winNum: this.position.number_of_winners
      });
    }
  }


  addPosition() {
    if (this.positionForm.invalid) {
      this.snackbar.open('Invalid form please try again.', 'Okay', {
        duration: 5000
      });
      return;
    }
    this.isProcessing = true;
    // tslint:disable-next-line:max-line-length
    this.positionService.registerPosition(this.data.election.id, this.positionForm.value.posName, this.positionForm.value.winNum, (this.isToUpdate) ? this.position.id : undefined).subscribe(
      (res: any) => {
        this.positionService.behaviorSource.next(1);
        this.snackbar.open(res.externalMessage, 'Okay', {
          duration: 5000
        });

      },
      (err) => {
        console.log(err);
        this.isProcessing = false;
        this.dialogRef.close();
      },
      () => {
        this.isProcessing = false;
        this.dialogRef.close();
      }
    );

  }

}
