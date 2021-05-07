import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectCreateComponent implements OnInit {
  controls = {
    Id: new FormControl(null),
    ProjectNumber: new FormControl(null, [Validators.required, Validators.max(10000), Validators.min(1), Validators.pattern(/^[1-9]+[0-9]*$/)], this.validateProNumber.bind(this)),
    Name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    Customer: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    GroupId: new FormControl(1),
    Employees: new FormControl(null, Validators.required),
    Status: new FormControl(0, Validators.required),
    StartDate: new FormControl(null, Validators.required),
    FinishDate: new FormControl(null)
  };

  @Output() title: EventEmitter<any> = new EventEmitter()

  projectForm = new FormGroup(this.controls);
  statusEnum = Status;
  listGroup: GroupDto[] = [];
  projectUpdate: Project;
  editMode = false;
  id: number;
  listEmployee = [];
  timestamp: string;
  constructor(private employeeServices: EmployeeServices,
    private groupServices: GroupServices,
    private projectServices: ProjectServices,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService) {
  }


  ngOnInit(): void {

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      if (this.editMode) {
        this.cdr.markForCheck();
        this.title.emit("TitleChooseEdit");

      }
      else {
        this.cdr.markForCheck();
        this.title.emit("TitleChooseNew");
      }
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
    this.projectForm = new FormGroup(this.controls, { validators: this.validateDate('StartDate', 'FinishDate') });
    if (this.editMode) {
      this.controls.ProjectNumber.disable();
      this.projectServices.getDetailProject(this.id).subscribe(projectDetail => {
        this.timestamp = projectDetail.TimeStamp;
        this.employeeServices.getInforByIds(projectDetail.EmployeeIds).subscribe(employees => {
          this.listEmployee = employees;
          this.projectForm.patchValue(Object.assign({}, projectDetail, {
            Employees: employees,
            StartDate: new Date(projectDetail.StartDate),
            FinishDate: projectDetail.FinishDate != null ? new Date(projectDetail.FinishDate) : null
          }));
          this.cdr.markForCheck();
        });
      })

    }
  }

  async onSubmit() {
    let project = await this.projectForm.getRawValue();
    project.EmployeeIds = await project.Employees.map(m => { return m.Id });
    await delete project.Employees;
    if (this.editMode) {
      project.TimeStamp = this.timestamp;
      this.projectServices.updateProject(project).subscribe(() => {
        this.router.navigate(['/project/list']);
      });
    }
    else {
      this.projectServices.createProject(project).subscribe(() => {
        this.router.navigate(['/project/list']);
      });

    }
  }

  resetForm() {
    this.router.navigate(['/project/list']);
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

  startDateGreaterFinishDate(control: AbstractControl): ValidatorFn {
    return (fGroup: FormGroup): ValidationErrors | null => {
      debugger
      if ((fGroup.controls.FinishDate.value != null) && (control.value > fGroup.controls.FinishDate.value)) {
        this.cdr.markForCheck();
        return { greaterThanDate: true };
      }
      return null;
    }
  }
  finishtDateLessStartDate(control: AbstractControl): ValidatorFn {
    return (fGroup: FormGroup): ValidationErrors | null => {
      debugger
      if ((fGroup.controls.StartDate.value != null) && (control.value < fGroup.controls.StartDate.value)) {
        this.cdr.markForCheck();
        return { lessThanDate: true };
      }
      return null;
    }
  }

  // validate date:
  validateDate(start: string, end: string): ValidatorFn {
    return (fGroup: FormGroup): ValidationErrors | null => {
      if (fGroup.controls[start].value && fGroup.controls[end].value) {
        if (fGroup.controls[start].value > fGroup.controls[end].value) {
          fGroup.controls[start].setErrors({ maxDate: "ErrorMaxDate" });
          fGroup.controls[end].setErrors({ minDate: "ErrorMinDate" });
          this.cdr.markForCheck();
          return { errorDate: true };
        }
        fGroup.controls[start].setErrors(null);
        fGroup.controls[end].setErrors(null);
        this.cdr.markForCheck();
      }
      return null;
    }
  }


  //validate already exist project number
  validateProNumber(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.projectServices.validateProjectNumber(+control.value).pipe(map(data => {
      if (data) {
        this.cdr.markForCheck();
        return { projectNumberDuplicate: "ErrorDuplicate" };
      }
      return null;
    }));
  }

  ///////////////////////////////////

  search(event) {
    this.employeeServices.getAllEmployee(event.query).subscribe((data) => {
      this.listEmployee = data;
      this.cdr.markForCheck();
    })
  }
}
