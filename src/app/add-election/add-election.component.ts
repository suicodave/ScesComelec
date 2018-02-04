import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatCheckboxChange, MatCheckbox, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-election',
  templateUrl: './add-election.component.html',
  styleUrls: ['./add-election.component.scss']
})
export class AddElectionComponent implements OnInit {
  @ViewChildren('checkInput') checkInputs: QueryList<MatCheckbox>;
  @ViewChild('includeIndiRef') includeIndiRef: MatCheckbox;
  @ViewChild('includeColRep') includeColRep: MatCheckbox;
  departments = [
    { id: 1, name: 'College' },
    { id: 2, name: 'Senior High' },
    { id: 3, name: 'Junior High' },
    { id: 4, name: 'Elementary' },
  ];

  selectedDepartments = [];
  isCollegeSelected = false;
  electionForm: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.electionForm = this.fb.group({
      sy: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }


  selectAll(event: MatCheckboxChange) {
    this.checkInputs.forEach((checkbox) => {
      const isChecked = event.checked;
      const selectedValue = checkbox.value;
      checkbox.checked = event.checked;
      this.insertSelectedDepartment(isChecked, selectedValue);

    });
    this.checkCollegeSelected();
    console.log(this.selectedDepartments);


  }

  onSelectDepartment(allBtn: MatCheckbox, event: MatCheckboxChange) {
    const isChecked = event.checked;
    const selectedValue = event.source.value;

    if (!isChecked && allBtn.checked) {
      allBtn.indeterminate = true;
    }

    this.insertSelectedDepartment(isChecked, selectedValue);
    console.log(this.selectedDepartments);

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
    const syId = this.electionForm.value.sy.id;
    const desc = this.electionForm.value.description;



    if (this.includeIndiRef.checked) {
      includeParty = true;
    }
    if (this.isCollegeSelected) {
      if (this.includeColRep.checked) {
        includeColRep = true;
      }
    }
    console.log(ids);
    console.log(includeParty);
    console.log(includeColRep);
    console.log(syId);


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
