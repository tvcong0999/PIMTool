import { AstVisitor } from '@angular/compiler';
import { AfterContentChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-show-message-error',
  template: '<span class="p-error"> {{message | translate}}</span>',
  styleUrls: ['./show-message-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowMessageErrorComponent implements AfterContentChecked {
  @Input() control: AbstractControl;

  message: string = "";

  constructor(private cdr: ChangeDetectorRef, public translate: TranslateService) { }

  ngAfterContentChecked() {
    this.showMessage(this.control);
  }


  showMessage(control: AbstractControl) {
    if (control.errors?.hasOwnProperty('maxDate')) {
      this.message = control.errors.maxDate;
    }

    if (control.errors?.hasOwnProperty('minDate')) {
      this.message = control.errors.minDate;
    }
    if (control.errors?.hasOwnProperty('noExist')) {
      this.message = control.errors.noExist;
    }

    if (control.errors?.hasOwnProperty('projectNumberDuplicate')) {
      this.cdr.markForCheck();
      this.message = control.errors.projectNumberDuplicate;
    }
    if (control.errors?.hasOwnProperty('required') || control.errors?.hasOwnProperty('min')
      || control.errors?.hasOwnProperty('max') || control.errors?.hasOwnProperty('maxlength')) {
      this.message = "ErrorCommon";
    }
    this.cdr.markForCheck();
  }
}
