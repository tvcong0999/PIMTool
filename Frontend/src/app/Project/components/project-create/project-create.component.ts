import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Project, Status } from '../../models/project.model';
import { EmployeeServices } from '../../../Employee/services/employee.service'
import { GroupDto } from 'src/app/swagger/models/group-dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { GroupServices } from 'src/app/Groups/services/group.service';
import { EmployeeDto, ProjectCreateDto, ProjectDto } from 'src/app/swagger/models';
import { ProjectServices } from '../../services';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  projectUpdate: Project;
  test: ProjectCreateDto;
  editMode = false;
  id;
  constructor(private employeeServices: EmployeeServices,
    private groupServices: GroupServices,
    private projectServices: ProjectServices,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.getGroups();
      this.initForm();
    })

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
    if (this.editMode) {
      // this.projectServices.projectUpdate.subscribe((data) => {
      //   this.projectUpdate = data;
      //   console.log(this.projectUpdate);

      // });
      this.projectUpdate = this.projectServices.listProject.find(x => x.Id = this.id);
      console.log(this.projectUpdate);
      this.projectForm = new FormGroup({
        Id: new FormControl(this.projectUpdate.Id),
        ProjectNumber: new FormControl(this.projectUpdate.ProjectNumber, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        Name: new FormControl(this.projectUpdate.Name, Validators.required),
        Customer: new FormControl(this.projectUpdate.Customer, Validators.required),
        GroupId: new FormControl(this.projectUpdate.GroupId),
        EmployeeIds: new FormControl(this.projectUpdate.EmployeeIds, Validators.required),
        Status: new FormControl(this.projectUpdate.Status),
        StartDate: new FormControl(this.projectUpdate.StartDate, Validators.required),
        FinishDate: new FormControl(this.projectUpdate.FinishDate)
      }, { validators: this.dateLessThan('StartDate', 'FinishDate') })
      this.projectForm.controls['ProjectNumber'].disable();
    }
    else {
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
        ProjectNumber: new FormControl(projectNumber, {validators: [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)], asyncValidators: this.validateProNumber.bind(this)}),
        Name: new FormControl(projectName, Validators.required),
        Customer: new FormControl(customer, Validators.required),
        GroupId: new FormControl(group),
        EmployeeIds: new FormControl(members, Validators.required),
        Status: new FormControl(status),
        StartDate: new FormControl(startDate, Validators.required),
        FinishDate: new FormControl(endDate)
      }, { validators: this.dateLessThan('StartDate', 'FinishDate') })
    }
  }

  //   public requestAutocompleteItemsFake = (text: string): Observable<string[]> => {
  //     return of([
  //         'item1', 'item2', 'item3'
  //     ]);
  // };

  onSubmit() {
    let listId = this.projectForm.get('EmployeeIds').value.map(m => { return m.Id });
    this.projectForm.controls['EmployeeIds'].setValue(listId);
    this.projectServices.createProject(this.projectForm.value).subscribe(() => {
      this.router.navigate(['/project/list']);
    });
    this.projectForm.reset();


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

  //validate already exist project number
  validateProNumber(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.projectServices.validateProjectNumber(+control.value).pipe(map(data => {
      if (data)
        return { "projectNumberDuplicate": true };
      return null;
    }));
  }
}
