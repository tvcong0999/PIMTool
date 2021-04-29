import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, NgModule, ViewChild, OnChanges, DoCheck, Output, EventEmitter } from '@angular/core';
import { Project, Status } from '../../models/project.model'
import { ProjectServices } from '../../services/index'

import { FormGroup, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectCreateDto } from 'src/app/swagger/models';
import { Router } from '@angular/router';
import { EmployeeServices } from 'src/app/Employee/services/employee.service';

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
    checkBoxDelete = 0;
    checkedIds = [];
    @Output() title: EventEmitter<any> = new EventEmitter()

    @ViewChild('searchForm', { static: false }) searchForm: NgForm
    projectForm: FormGroup
    constructor(public projectServices: ProjectServices,
        private employeeServices: EmployeeServices,
        private cdr: ChangeDetectorRef,
        private router: Router) {
    }

    ngOnInit() {
        // get all project
        this.getAllProject();
        this.title.emit("List Project");
    }

    private getAllProject() {
        this.projectServices.getAllProject().subscribe(data => {
            this.projectServices.listProject = data;
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
            this.projectServices.listProject = data;
            this.cdr.markForCheck();
        })
    }



    onDeleteProject(id) {
        this.projectServices.getDetailProject(id).subscribe(data => {
            if (data.Status == 0) {
                this.projectServices.deleteProject([id]).subscribe(() => {
                    this.getAllProject();
                });
            }
            else {
                console.log("shouldn't delete");
            }

        })
    }
    onDeleteProjects() {
        this.projectServices.deleteProject(this.checkedIds).subscribe(() => {
            this.getAllProject();
        });
        this.checkedIds = [];
    }
}
