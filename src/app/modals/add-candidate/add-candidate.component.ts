import { Component, OnInit, Inject } from '@angular/core';
import { MatSelectionListChange, MatSelectionList, MatSnackBar, MatSelectChange, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-add-candidate',
  templateUrl: './add-candidate.component.html',
  styleUrls: ['./add-candidate.component.scss']
})
export class AddCandidateComponent implements OnInit {
  candidateForm: FormGroup;
  imgUrl;
  selectedStudent;
  selectedParty;
  selectedPosition;
  positions;
  partylists;
  isPartyEnabled;
  foundStudents;
  file;
  isSearching = false;
  isRegistering = false;
  // tslint:disable-next-line:max-line-length
  constructor( @Inject(MAT_DIALOG_DATA) private data, private snackbar: MatSnackBar, private fb: FormBuilder, private candidateService: CandidateService, private dialog: MatDialogRef<AddCandidateComponent>) { }

  ngOnInit() {
    this.initForm();
    console.log(this.data);

  }


  initForm() {
    this.positions = this.data.positions;
    this.candidateForm = this.fb.group({
      position: ['', [Validators.required]],
      aboutMe: ['', [Validators.required]]
    });

    if (this.data.election.is_party_enabled) {
      this.partylists = this.data.partylists;
      this.candidateForm.addControl('partylist', new FormControl('', [Validators.required]));
    }
  }

  getImage(event: any) {
    if (event.target.files && event.target.files[0]) {

      const reader = new FileReader();

      // tslint:disable-next-line:no-shadowed-variable
      reader.onload = (event: any) => {
        this.imgUrl = event.target.result;


      };
      this.file = event.target.files[0];

      reader.readAsDataURL(event.target.files[0]);

    }


  }

  onSelectStudent(obj: MatSelectionList, event: MatSelectionListChange) {

    const selected = obj.selectedOptions.selected;
    if (selected.length > 1) {
      event.option.selected = false;
      return;
    }

    if (event.option.selected == false) {
      this.selectedStudent = null;
    } else {

      this.selectedStudent = selected[0].value;
    }


  }

  findStudent(query) {
    this.isSearching = true;
    console.log(query);
    this.candidateService.findStudents(query).subscribe(
      (res: any) => {
        this.isSearching = false;
        this.foundStudents = res.data;
      }
    );
  }


  registerCandidate() {
    if (this.candidateForm.invalid) {
      this.snackbar.open('Invalid form please try again.', 'Okay', {
        duration: 5000
      });
      return;
    }

    if (!this.selectedStudent) {
      this.snackbar.open('Please select a student as candidate!', 'Okay', {
        duration: 5000
      });
      return;
    }

    if (!this.imgUrl) {
      this.snackbar.open('Profile image for candidate is required!', 'Okay', {
        duration: 5000
      });
      return;
    }
    this.isRegistering = true;
    // tslint:disable-next-line:max-line-length
    this.candidateService.registerCandidate(this.data.election.id, this.file, this.selectedStudent.id, this.candidateForm.value.position.id, this.candidateForm.value.aboutMe, (this.candidateForm.get('partylist') != null) ? this.candidateForm.value.partylist.id : 0).subscribe(
      (res: any) => {
        console.log(res.data);
        this.candidateService.candidateBehaviorSource.next(1);
        this.snackbar.open(res.externalMessage, 'Okay', {
          duration: 5000
        });
        this.dialog.close();
      },
      (err) => {
        this.isRegistering = false;
        if ('externalMessage' in err.error) {
          this.snackbar.open(err.error.externalMessage, 'Okay', {
            duration: 5000
          });
        } else {
          this.snackbar.open('Operation failed. Please try again.', 'Okay', {
            duration: 5000
          });
        }
      }
    );



  }

}
