import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Status } from '../../models/project.model';
import { EmployeeServices } from '../../../Employee/services/employee.service'
import { GroupDto } from 'src/app/swagger/models/group-dto';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { GroupServices } from 'src/app/Groups/services/group.service';
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
  constructor(private employeeServices: EmployeeServices, private groupServices: GroupServices, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.initForm();
    this.getEmployee("CTV");
    this.getGroups();
   
  }

  private getEmployee(value) {
    // // get employee by name or visa
    // this.employeeServices.getAllEmployee(value).subscribe(data => {
    //   this.listEmployee = data;
    //   console.log(data);
    // })
  }

  private getGroups(){
    this.groupServices.getAllGroup().subscribe(data=>{
      this.listGroup = data;
      this.cdr.markForCheck();
    })
  }

  private initForm() {
    let projectNumber = '';
    let projectName = '';
    let customer = '';
    let group = [1];
    let members: string[] = [];
    let status = 'NEW';
    let startDate = '';
    let endDate = '';

    //create new form project
    this.projectForm = new FormGroup({
      projectNumber: new FormControl(projectNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      projectName: new FormControl(projectName, Validators.required),
      customer: new FormControl(customer, Validators.required),
      group: new FormControl(group),
      member: new FormControl(members, Validators.required),
      status: new FormControl(status),
      startDate: new FormControl(startDate, Validators.required),
      endDate: new FormControl(endDate),

    })
  }

//   public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
//     return of([
//         'item1', 'item2', 'item3'
//     ]);
// };

  onSubmit() {
    console.log(this.projectForm);
  }

  testChange(){
    console.log(this.projectForm.get('member').value)
    this.getEmployee(this.projectForm.get('member').value);
  }
  public requestAutocompleteEmployees = (text:string):Observable<string[]>=>{
    return this.employeeServices.getAllEmployee(text);
  }
}
