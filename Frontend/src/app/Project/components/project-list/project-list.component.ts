import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from '../../models/project.model'
import { ProjectServices } from '../../services/index'

@Component({
    selector: 'pim-project-list',
    styleUrls: ['./project-list.component.scss'],
    templateUrl: './project-list.component.html',
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {
    nameChoose = "Projects List";
    listProject: Project[] = [];
    subscription: Subscription;
    constructor(private projectServices: ProjectServices) {
        this.projectServices.getAllProject().subscribe();
    }

    ngOnInit() {
        this.subscription = this.projectServices.projectChanged.subscribe((data) => {
            this.listProject = data;
            console.log(this.listProject);
        });
        this.listProject = this.projectServices.getAll();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
