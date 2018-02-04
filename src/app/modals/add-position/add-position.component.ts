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
  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) private data, private fb: FormBuilder, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddPositionComponent>, private positionService: PositionService) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.positionForm = this.fb.group({
      posName: ['', [Validators.required]],
      winNum: ['', [Validators.required]]
    });
  }


  addPosition() {
    if (this.positionForm.invalid) {
      this.snackbar.open('Invalid form please try again.', 'Okay', {
        duration: 5000
      });
      console.log(this.positionForm);


      return;
    }

    this.positionService.registerPosition(this.data.election.id, this.positionForm.value.posName, this.positionForm.value.winNum).subscribe(
      (res: any) => {
        console.log(res.data);
        this.dialogRef.close();
      }
    );

  }

}
