import { Component, ChangeDetectionStrategy, AfterContentInit, ChangeDetectorRef, HostListener, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ProjectServices } from 'src/app/Project/services';

@Component({
  selector: 'pim-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements AfterContentInit {
  nameChoose: string = "";
  chooseEnglish: boolean = true;
  constructor(public translate: TranslateService, private cdr: ChangeDetectorRef, public projectServices: ProjectServices, private router: Router) {
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
  ngAfterContentInit() {

  }

  onActive(component) {
    component.title.subscribe(data => {
      this.nameChoose = data;
    })
  }

  english() {
    this.translate.use('en');
    this.chooseEnglish = true;
  }
  france() {
    this.translate.use('fr');
    this.chooseEnglish = false;
  }
  backToList() {
    this.projectServices.displayDialog = false;
    this.router.navigate(['project/list'])
  }
}
