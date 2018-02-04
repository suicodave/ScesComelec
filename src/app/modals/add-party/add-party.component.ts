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
  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) private data, private fb: FormBuilder, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddPartyComponent>, private partyService: PartylistService) { }

  ngOnInit() {
    this.initForms();
  }

  initForms() {
    this.partyForm = this.fb.group({
      partyName: ['', [Validators.required]]
    });
  }

  addParty() {
    if (this.partyForm.invalid) {
      this.snackbar.open('Invalid Partylist Name.', 'Okay', {
        duration: 5000
      });
      return;
    }


    this.partyService.registerPartylist(this.data.election.id, this.partyForm.value.partyName).subscribe(
      (res: any) => {
        console.log(res.data);
        this.dialogRef.close();
      }
    );


  }

}
