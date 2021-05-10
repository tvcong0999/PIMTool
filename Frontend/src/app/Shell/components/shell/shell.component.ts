import { Component, ChangeDetectionStrategy, AfterContentInit, ChangeDetectorRef, HostListener, ViewChild, ElementRef, AfterContentChecked } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'pim-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements AfterContentChecked {
  
  chooseEnglish: boolean = true;
  constructor(public translate: TranslateService, private cdr: ChangeDetectorRef) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
  ngAfterContentChecked() {
    this.cdr.markForCheck();
  }

 

  english() {
    this.translate.use('en');
    this.chooseEnglish = true;
  }
  france() {
    this.translate.use('fr');
    this.chooseEnglish = false;
  }

}
