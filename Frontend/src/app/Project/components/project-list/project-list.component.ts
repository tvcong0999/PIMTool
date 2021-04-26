import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, NgModule, ViewChild } from '@angular/core';
import { Project, Status } from '../../models/project.model'
import { ProjectServices } from '../../services/index'

import { FormGroup, NgForm } from '@angular/forms';

@Component({
    selector: 'pim-project-list',
    styleUrls: ['./project-list.component.scss'],
    templateUrl: './project-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit {
    keysearch;
    status;
    statusEnum = Status;
    nameChoose = "Projects List";
    listProject: Project[] = [];
    checkBoxDelete = 0;

    @ViewChild('searchForm', { static: false }) searchForm: NgForm
    projectForm: FormGroup
    constructor(private projectServices: ProjectServices, private cdr: ChangeDetectorRef) {
    }

    ngOnInit() {
        // get all project
        this.getAllProject();

    }

    private getAllProject() {
        this.projectServices.getAllProject().subscribe(data => {
            this.listProject = data;
            this.cdr.markForCheck();
        })
    }

    checkValue($event) {
        if ($event.target.checked)
            this.checkBoxDelete++;
        else
            this.checkBoxDelete--;
    }

    resetForm() {
        this.searchForm.reset();
        this.getAllProject();
    }

    onSubmit(searchForm) {
        searchForm.value.status = searchForm.value.status == "" ? "EMPTY" : searchForm.value.status;
        this.projectServices.getHaveCondition(searchForm.value.keysearch, searchForm.value.status, 1).subscribe(data => {
            this.listProject = data;
            this.cdr.markForCheck();
        })
    }
}
