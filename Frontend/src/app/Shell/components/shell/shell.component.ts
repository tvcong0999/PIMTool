import { Component, ChangeDetectionStrategy, AfterContentInit, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pim-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements AfterContentInit {
  nameChoose: string = "";
  chooseEnglish: boolean = true;
  constructor(public translate: TranslateService, private cdr: ChangeDetectorRef){
    translate.addLangs(['en', 'fr']);
    translate.setDefaultLang('en');
  }
  ngAfterContentInit(){
  }
  onActive(component){
    component.title.subscribe(data=>{
      this.nameChoose = data;
    })
  }

  english(){
    this.cdr.markForCheck();
    this.translate.use('en');
    this.chooseEnglish = true;
  }
  france(){
    this.cdr.markForCheck();
    this.translate.use('fr');
    this.chooseEnglish = false;
  }
}
