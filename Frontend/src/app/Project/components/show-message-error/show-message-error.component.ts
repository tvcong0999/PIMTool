import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-show-message-error',
  template: '<span class="p-error"> {{message}}</span>',
  styleUrls: ['./show-message-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowMessageErrorComponent implements OnInit, DoCheck {
  @Input('projectNumber') projectNumber: FormControl;
  @Input() projectName: FormControl;
  @Input() customer: FormControl;
  @Input() member: FormControl;
  @Input() startDate: FormControl;
  @Input() endDate: FormControl;
  message: string = "";

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }
  ngDoCheck() {
    if (this.projectNumber)
      this.ProjectNumberError(this.projectNumber);
    if (this.projectName)
      this.ProjectNameError(this.projectName);
    if (this.customer)
      this.CustomerError(this.customer);
    if (this.member)
      this.MemberError(this.member);
    if (this.startDate)
      this.StartDateError(this.startDate);
    if (this.endDate)
      this.EndDateError(this.endDate);
    this.cdr.markForCheck();
  }

  ProjectNumberError(control: FormControl) {
    if (control.errors.required) {
      this.message = "Please enter project number.";
    }
    if (control.errors?.projectNumberDuplicate) {
      this.message = "Project number is already exist.";
    }
    if (control.errors?.min) {
      this.message = "Project number must be greater than 1.";
    }
    if (control.errors?.max) {
      this.message = "Project number must be less than 10000.";
    }
  }

  ProjectNameError(control: FormControl) {
    if (control.errors.required) {
      this.message = "Please enter project name.";
    }
    if (control.errors.maxlength) {
      this.message = "Project name must be less than 50 characters.";
    }
  }

  CustomerError(control: FormControl) {
    this.ProjectNameError(control);
  }

  MemberError(control: FormControl) {
    if (control.errors.required) {
      this.message = "Please enter project name.";
    }
  }

  StartDateError(control: FormControl) {
    this.MemberError(control);
    if (control.errors.greaterThanDate) {
      this.message = "Start Date should be less than end date."
    }
  }

  EndDateError(control: FormControl) {
    debugger
    if (control.hasError('lessThanDate')) {
      this.message = "End Date should be greater than start date."
    }

  }

}
