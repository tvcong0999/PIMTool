import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from "@angular/core";
import { ProjectServices } from 'src/app/Project/services';
import { Router } from '@angular/router';
@Component({
    selector: 'pim-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProjectComponent {

    nameChoose: string = "";
    constructor(public projectServices: ProjectServices, private router: Router, private cdr: ChangeDetectorRef) { }

    ngAfterContentChecked() {
        this.cdr.markForCheck();
      }

    onActive(component) {
        component.title.subscribe(data => {
            this.nameChoose = data;
        })
    }
    backToList() {
        this.projectServices.displayDialog = false;
        this.router.navigate(['project/list'])
      }
}