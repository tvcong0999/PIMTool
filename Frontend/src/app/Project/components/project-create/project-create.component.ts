import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../models/project.model';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styles: [
  ]
})
export class ProjectCreateComponent implements OnInit {
  projectForm: FormGroup;
  statusEnum = Status;

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    let projectNumber = '';
    let projectName = '';
    let customer = '';
    let group = '';
    let member = [];
    let status = '';
    let startDate = '';
    let endDate = '';

    //create new form project
    this.projectForm = new FormGroup({
      projectNumber: new FormControl(projectNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      projectName: new FormControl(projectName, Validators.required),
      customer: new FormControl(customer, Validators.required),
      group: new FormControl(group, Validators.required),
      member: new FormControl(member, Validators.required),
      status: new FormControl(status, Validators.required),
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate),

    })
  }

  onSubmit(){

  }
}
