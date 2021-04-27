import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, NgModule, ViewChild, OnChanges, DoCheck } from '@angular/core';
import { Project, Status } from '../../models/project.model'
import { ProjectServices } from '../../services/index'

import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectCreateDto } from 'src/app/swagger/models';

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
    checkedIds = [];

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
        let id = +$event.target.id;
        if ($event.target.checked) {
            this.checkedIds.push(id)
            this.checkBoxDelete++;
        }
        else {
            this.checkedIds.splice(this.checkedIds.indexOf(id), 1);
            this.checkBoxDelete--;
        }
    }

    resetForm() {
        this.searchForm.reset();
        this.getAllProject();
    }

    onSubmit(searchForm) {
        this.projectServices.getHaveCondition(searchForm.value.keysearch, searchForm.value.status, 1).subscribe(data => {
            this.listProject = data;
            this.cdr.markForCheck();
        })
    }
    updateProject(project) {
        console.log(project);
    }

    onDeleteProject(id) {
        this.projectServices.deleteProject([id]).subscribe(() => {
            this.getAllProject();
        });

    }
    onDeleteProjects(){
        this.projectServices.deleteProject(this.checkedIds).subscribe(() => {
            this.getAllProject();
        });
    }
}
