import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatCheckboxChange, MatCheckbox, MatSnackBar, MatDialogRef } from '@angular/material';
import { ElectionService } from '../services/election.service';
import { SchoolSettingsService } from '../services/school-settings.service';
import 'rxjs/add/operator/pluck';

import { combineLatest } from 'rxjs/observable/combineLatest';
@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.scss']
})
export class AddElectionComponent implements OnInit {
  @ViewChildren('checkInput') checkInputs: QueryList<MatCheckbox>;
  @ViewChild('includeIndiRef') includeIndiRef: MatCheckbox;
  @ViewChild('includeColRep') includeColRep: MatCheckbox;
  departments;
  schoolYears;
  activeSchoolYear;
  selectedDepartments = [];
  isCollegeSelected = false;
  electionForm: FormGroup;
  isSettingsLoaded = false;
  isRegistering = false;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private snackbar: MatSnackBar, private dialogRef: MatDialogRef<AddElectionComponent>, private schoolSettingService: SchoolSettingsService, private electionService: ElectionService) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {

    const getSchoolYears = this.schoolSettingService.getSchoolYears().pluck('data');
    const getActiveSY = this.schoolSettingService.getActiveSchoolYear().pluck('data');
    const getCurrentDepartment = this.schoolSettingService.getDepartments().pluck('data');

    combineLatest([getSchoolYears, getActiveSY, getCurrentDepartment]).subscribe(
      (res: any) => {

        this.schoolYears = res[0];
        this.departments = res[2];
        this.activeSchoolYear = res[1];
        this.electionForm = this.fb.group({
          description: ['', [Validators.required]]
        });

        this.isSettingsLoaded = true;

      }
    );



  }


  selectAll(event: MatCheckboxChange) {
    this.checkInputs.forEach((checkbox) => {
      const isChecked = event.checked;
      const selectedValue = checkbox.value;
      checkbox.checked = event.checked;
      this.insertSelectedDepartment(isChecked, selectedValue);

    });
    this.checkCollegeSelected();


  }

  onSelectDepartment(allBtn: MatCheckbox, event: MatCheckboxChange) {
    const isChecked = event.checked;
    const selectedValue = event.source.value;

    if (!isChecked && allBtn.checked) {
      allBtn.indeterminate = true;
    }

    this.insertSelectedDepartment(isChecked, selectedValue);

    this.checkCollegeSelected();

  }

  insertSelectedDepartment(isChecked: boolean, selectedValue) {
    const index = this.selectedDepartments.indexOf(selectedValue);
    if (isChecked) {
      if (index == -1) {

        this.selectedDepartments.push(selectedValue);
      }
    } else {

      if (index != -1) {
        this.selectedDepartments.splice(index, 1);
      }
    }


  }


  addElection() {
    if (this.selectedDepartments.length < 1 || this.electionForm.invalid) {
      this.snackbar.open('Invalid setup please try again.', 'Okay', {
        duration: 5000
      });

      return;
    }

    let includeParty = false;
    let includeColRep = false;
    const ids = this.selectedDepartments.map((dep) => dep.id);
    const syId = this.activeSchoolYear.id;
    const desc = this.electionForm.value.description;



    if (this.includeIndiRef.checked) {
      includeParty = true;
    }
    if (this.isCollegeSelected) {
      if (this.includeColRep.checked) {
        includeColRep = true;
      }
    }
    this.isRegistering = true;
    this.electionService.registerElection(syId, desc, ids, includeParty, includeColRep).subscribe(
      (res: any) => {
        this.electionService.behaviorSource.next(1);
        this.snackbar.open(res.externalMessage, 'Okay', {
          duration: 5000
        });

      },
      (err) => {
        this.isRegistering = false;
      },
      () => {
        this.dialogRef.close();
      }
    );

  }

  checkCollegeSelected() {
    const findCollege = this.selectedDepartments.find((dep) => dep.name == 'College');
    if (findCollege != undefined) {
      this.isCollegeSelected = true;
    } else {
      this.isCollegeSelected = false;
    }
  }

}
