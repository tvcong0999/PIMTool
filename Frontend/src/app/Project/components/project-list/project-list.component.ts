import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Project, Status } from '../../models/project.model'
import { ProjectServices } from '../../services/index'

import { FormGroup } from '@angular/forms';

@Component({
    selector: 'pim-project-list',
    styleUrls: ['./project-list.component.scss'],
    templateUrl: './project-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
    status: Status;
    nameChoose = "Projects List";
    listProject: Project[] = [];

    projectForm: FormGroup
    constructor(private projectServices: ProjectServices, private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        // get all project
        this.projectServices.getAllProject().subscribe(data => {
            this.listProject = data;
            console.log(data);
            this.cdr.markForCheck();
        })

    }
}
