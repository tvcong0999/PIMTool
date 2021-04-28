import { Component, ChangeDetectionStrategy, AfterContentInit } from '@angular/core';

@Component({
  selector: 'pim-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements AfterContentInit {
  nameChoose = "";
  ngAfterContentInit(){

  }
  onActive(component){
    component.title.subscribe(data=>{
      this.nameChoose = data;
    })
  }
}
