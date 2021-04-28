import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Project, Status } from '../../models/project.model';
import { EmployeeServices } from '../../../Employee/services/employee.service'
import { GroupDto } from 'src/app/swagger/models/group-dto';
import { Observable, of } from 'rxjs';
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
  controls = {
    id: new FormControl(null),
    projectNumber: new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.min(1), Validators.pattern(/^[1-9]+[0-9]*$/)], this.validateProNumber.bind(this)),
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    customer: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    groupId: new FormControl(1),
    employeeIds: new FormControl(null, Validators.required),
    status: new FormControl(0, Validators.required),
    startDate: new FormControl(null, Validators.required),
    finishDate: new FormControl(null)
  };

  projectForm = new FormGroup(this.controls);
  statusEnum = Status;
  listGroup: GroupDto[] = [];
  projectUpdate: Project;
  editMode = false;
  id;
  listEmployee = [];
  constructor(private employeeServices: EmployeeServices,
    private groupServices: GroupServices,
    private projectServices: ProjectServices,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.projectUpdate = this.projectServices.listProject.find(x => x.Id = this.id);
    });
    this.getGroups();
    this.initForm();
  }

  private getGroups() {
    this.groupServices.getAllGroup().subscribe(data => {
      this.listGroup = data;
      this.cdr.markForCheck();
    })
  }

  private initForm() {
    //create new form project
    this.projectForm = new FormGroup(this.controls, { validators: this.dateLessThan('startDate', 'finishDate') })
    if (this.editMode) {
      this.projectForm.controls['ProjectNumber'].disable();
      this.employeeServices.getInforByIds(this.projectUpdate.EmployeeIds).subscribe(data => {
        this.listEmployee = data;
        this.projectForm.patchValue(Object.assign({}, this.projectUpdate, {
          employeeIds: this.listEmployee,
          startDate: new Date(this.projectUpdate.StartDate).toISOString().substring(0, 10),
          finishDate: new Date(this.projectUpdate.FinishDate).toISOString().substring(0, 10)
        }));

        // this.projectForm.patchValue({
        //   Id: this.projectUpdate.Id,
        //   ProjectNumber: this.projectUpdate.ProjectNumber,
        //   Name: this.projectUpdate.Name,
        //   Customer: this.projectUpdate.Customer,
        //   GroupId: this.projectUpdate.GroupId,
        //   EmployeeIds: this.listEmployee,
        //   Status: Status[this.projectUpdate.Status],
        //   StartDate: new Date(this.projectUpdate.StartDate).toISOString().substring(0, 10),
        //   FinishDate: new Date(this.projectUpdate.FinishDate).toISOString().substring(0, 10)
        // });
        // this.projectForm = new FormGroup({
        //   Id: new FormControl(this.projectUpdate.Id),
        //   ProjectNumber: new FormControl(this.projectUpdate.ProjectNumber),
        //   Name: new FormControl(this.projectUpdate.Name, [Validators.required, Validators.maxLength(50)]),
        //   Customer: new FormControl(this.projectUpdate.Customer, [Validators.required, Validators.maxLength(50)]),
        //   GroupId: new FormControl(this.projectUpdate.GroupId),
        //   EmployeeIds: new FormControl(this.listEmployee, Validators.required),
        //   Status: new FormControl(Status[this.projectUpdate.Status]),
        //   StartDate: new FormControl(new Date(this.projectUpdate.StartDate).toISOString().substring(0, 10), Validators.required),
        //   FinishDate: new FormControl(new Date(this.projectUpdate.FinishDate).toISOString().substring(0, 10))
        // }, { validators: this.dateLessThan('StartDate', 'FinishDate') })
        this.cdr.markForCheck();
      });
    }

  }

  onSubmit() {
    let project = this.projectForm.getRawValue();
    let listId = this.projectForm.get('EmployeeIds').value.map(m => { return m.Id });
    this.projectForm.controls['EmployeeIds'].setValue(listId);
    if (this.editMode) {
      this.projectServices.updateProject(project).subscribe(() => {
        this.projectForm.reset();
        this.router.navigate(['/project/list']);
        console.log(this.projectForm.value);
      });
    }
    else {
      this.projectServices.createProject(project).subscribe(() => {
        this.projectForm.reset();
        this.router.navigate(['/project/list']);
        console.log(this.projectForm.value);
      });

    }

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
      if (fGroup.controls[start].value <= fGroup.controls[end].value || fGroup.controls[end].value == null) {
        return null;
      }
      return { err: "lessThanDate" };

    }
  }

  //validate already exist project number
  validateProNumber(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.projectServices.validateProjectNumber(+control.value).pipe(map(data => {
      if (data) {
        return { "projectNumberDuplicate": true };
      }
      return null;
    }));
  }

  ///////////////////////////////////

  search(event) {
    this.employeeServices.getAllEmployee(event.query).subscribe((data) => {
      this.listEmployee = data;
    })
  }
}
