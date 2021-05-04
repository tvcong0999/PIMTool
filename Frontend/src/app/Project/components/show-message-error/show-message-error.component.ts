import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-show-message-error',
  template: '<span class="p-error"> {{message}}</span>',
  styleUrls: ['./show-message-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowMessageErrorComponent implements OnInit, DoCheck {
  @Input() projectNumber: AbstractControl;
  @Input() projectName: AbstractControl;
  @Input() customer: AbstractControl;
  @Input() member: AbstractControl;
  @Input() startDate: AbstractControl;
  @Input() endDate: AbstractControl;
  message: string = "";

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {

  }
  ngDoCheck() {
    if (this.projectNumber) {
      this.ProjectNumberError(this.projectNumber);
    }
    if (this.projectName) {
      this.ProjectNameError(this.projectName);
    }
    if (this.customer) {
      this.CustomerError(this.customer);
    }
    if (this.member) {
      this.MemberError(this.member);
    }
    if (this.startDate) {
      this.StartDateError(this.startDate);
    }

    if (this.endDate) {
      this.EndDateError(this.endDate);
    }
    this.cdr.markForCheck();
  }

  ProjectNumberError(control: AbstractControl) {
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

  ProjectNameError(control: AbstractControl) {
    if (control.errors.required) {
      this.message = "Please enter project name.";
    }
    if (control.errors.maxlength) {
      this.message = "Project name must be less than 50 characters.";
    }
  }

  CustomerError(control: AbstractControl) {
    if (control.errors.required) {
      this.message = "Please enter customer name.";
    }
    if (control.errors.maxlength) {
      this.message = "Customer name must be less than 50 characters.";
    }
  }

  MemberError(control: AbstractControl) {
    if (control.errors.required) {
      this.message = "Please enter member.";
    }
  }

  StartDateError(control: AbstractControl) {
    if (control.errors.required) {
      this.message = "Please enter start date.";
    }
    if (control.hasError('greaterThanDate')) {
      this.message = "Start Date should be less than end date."
    }
  }

  EndDateError(control: AbstractControl) {
    if (control.hasError('lessThanDate')) {
      this.message = "End Date should be greater than start date."
    }
  }
}
