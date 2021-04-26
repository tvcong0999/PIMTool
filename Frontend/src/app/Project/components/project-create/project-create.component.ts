import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../models/project.model';
import { EmployeeServices } from '../../../Employee/services/employee.service'
import { EmployeeDto } from 'src/app/swagger/models/employee-dto';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styles: [
  ]
})
export class ProjectCreateComponent implements OnInit {
  projectForm: FormGroup;
  statusEnum = Status;
  listGroup = [1, 2, 3, 4];
  listEmployee: EmployeeDto[];
  items = ['Javascript', 'Typescript'];
  constructor(private employeeServices: EmployeeServices) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployee("CTV");
  }

  private getEmployee(value) {
    // get employee by name or visa
    this.employeeServices.getAllEmployee(value).subscribe(data => {
      this.listEmployee = data;
      console.log(data);
    })
  }

  private initForm() {
    let projectNumber = '';
    let projectName = '';
    let customer = '';
    let group = 1;
    let member = '';
    let status = 'NEW';
    let startDate = '';
    let endDate = '';

    //create new form project
    this.projectForm = new FormGroup({
      projectNumber: new FormControl(projectNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      projectName: new FormControl(projectName, Validators.required),
      customer: new FormControl(customer, Validators.required),
      group: new FormControl(group),
      member: new FormControl(member, Validators.required),
      status: new FormControl(status),
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate),

    })
  }

  public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
    return of([
        'item1', 'item2', 'item3'
    ]);
};

  onSubmit() {
    console.log(this.projectForm);
  }
}
