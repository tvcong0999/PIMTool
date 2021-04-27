import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Status } from '../../models/project.model';
import { EmployeeServices } from '../../../Employee/services/employee.service'
import { GroupDto } from 'src/app/swagger/models/group-dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GroupServices } from 'src/app/Groups/services/group.service';
import { EmployeeDto } from 'src/app/swagger/models';
import { ProjectServices } from '../../services';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCreateComponent implements OnInit {
  projectForm: FormGroup;
  statusEnum = Status;
  listGroup: GroupDto[] = [];
  autocompleteItems = ["Item1", "item2", "item3"];
  constructor(private employeeServices: EmployeeServices,
    private groupServices: GroupServices,
    private projectServices: ProjectServices,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initForm();
    this.getGroups();

  }

  private getEmployee(value) {
    // // get employee by name or visa
    // this.employeeServices.getAllEmployee(value).subscribe(data => {
    //   this.listEmployee = data;
    //   console.log(data);
    // })
  }

  private getGroups() {
    this.groupServices.getAllGroup().subscribe(data => {
      this.listGroup = data;
      this.cdr.markForCheck();
    })
  }

  private initForm() {
    let id;
    let projectNumber = '';
    let projectName = '';
    let customer = '';
    let group = 1;
    let members: Array<number> = [];
    let status = 'NEW';
    let startDate = '';
    let endDate = '';

    //create new form project
    this.projectForm = new FormGroup({
      Id: new FormControl(id),
      ProjectNumber: new FormControl(projectNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      Name: new FormControl(projectName, Validators.required),
      Customer: new FormControl(customer, Validators.required),
      GroupId: new FormControl(group),
      EmployeeIds: new FormControl(members, Validators.required),
      Status: new FormControl(status),
      StartDate: new FormControl(startDate, Validators.required),
      FinishDate: new FormControl(endDate)
    }, { validators: this.dateLessThan('StartDate', 'FinishDate') })
  }

  //   public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
  //     return of([
  //         'item1', 'item2', 'item3'
  //     ]);
  // };

  onSubmit() {
    let listId = this.projectForm.get('EmployeeIds').value.map(m => { return m.Id });
    this.projectForm.controls['EmployeeIds'].setValue(listId);
    this.projectServices.createProject(this.projectForm.value).subscribe();
    this.projectForm.reset();
    this.router.navigate(['/project/list']);

  }

  testChange() {
    console.log(this.projectForm.get('EmployeeIds').value)
    this.getEmployee(this.projectForm.get('EmployeeIds').value);
  }

  public requestAutocompleteEmployees = (text: string): Observable<Object[]> => {
    return this.employeeServices.getAllEmployee(text).pipe(map(data => {
      let listVisa: Object[] = [];
      for (let item of data) {
        listVisa.push({ Id: item.Id, Visa: item.Visa + ": " + item.LastName + " " + item.FirstName });
      }
      this.cdr.markForCheck();
      return listVisa;
    }));
  }

  //validate date
  dateLessThan(start: string, end: string): ValidatorFn {
    return (fGroup: FormGroup): { [err: string]: any } => {
      if (fGroup.controls[start].value > fGroup.controls[end].value)
        return { err: "Start date should be less than end date" };
      return null;

    }
  }
}
