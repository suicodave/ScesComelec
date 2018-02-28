import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PartylistService } from '../../services/partylist.service';

@Component({
  selector: 'app-add-party',
  templateUrl: './add-party.component.html',
  styleUrls: ['./add-party.component.scss']
})
export class AddPartyComponent implements OnInit {
  partyForm: FormGroup;
  isToUpdate = false;
  partylist;
  isProcessing = false;
  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) private data, private fb: FormBuilder, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddPartyComponent>, private partyService: PartylistService) { }

  ngOnInit() {
    this.initForms();

  }

  initForms() {
    this.isToUpdate = this.data.toUpdate;

    this.partyForm = this.fb.group({
      partyName: ['', [Validators.required]]
    });

    if (this.isToUpdate) {
      this.partylist = this.data.partylist;
      this.partyForm.patchValue({ partyName: this.partylist.name });
    }
  }

  addParty() {
    if (this.partyForm.invalid) {
      this.snackbar.open('Invalid Partylist Name.', 'Okay', {
        duration: 5000
      });
      return;
    }

    this.isProcessing = true;

    // tslint:disable-next-line:max-line-length
    this.partyService.registerPartylist(this.data.election.id, this.partyForm.value.partyName, (this.isToUpdate) ? this.partylist.id : undefined).subscribe(
      (res: any) => {
        this.partyService.behaviorSource.next(1);
        this.snackbar.open(res.externalMessage, 'Okay', {
          duration: 5000
        });


      },
      (err) => {

        this.isProcessing = false;
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      }
    );


  }

}
