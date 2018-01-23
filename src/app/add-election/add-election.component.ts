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
  departments = [
    { id: 1, name: 'College' },
    { id: 2, name: 'Senior High' },
    { id: 3, name: 'Junior High' },
    { id: 4, name: 'Elementary' },
  ];

  selectedDepartments = [];

  departmentForm: FormGroup;

  constructor(private fb: FormBuilder, private snackbar: MatSnackBar) {

  }

  ngOnInit() {
  }



  selectAll(event: MatCheckboxChange) {
    this.checkInputs.forEach((checkbox) => {
      const isChecked = event.checked;
      const selectedValue = checkbox.value;
      checkbox.checked = event.checked;
      this.insertSelectedDepartment(isChecked, selectedValue);
    });
    console.log(this.selectedDepartments);


  }

  onSelectDepartment(event: MatCheckboxChange) {
    const isChecked = event.checked;
    const selectedValue = event.source.value;
    this.insertSelectedDepartment(isChecked, selectedValue);
    console.log(this.selectedDepartments);


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
    if (this.selectedDepartments.length < 1) {
      this.snackbar.open('Please select at least one Department', 'Okay', {
        duration: 5000
      });

      return;
    }

    const ids = this.selectedDepartments.map((dep) => dep.id);
    console.log(ids);

    console.log(this.includeIndiRef.checked);
  }

}
