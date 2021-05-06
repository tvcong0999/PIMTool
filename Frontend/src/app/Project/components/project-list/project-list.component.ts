import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Project, Status } from '../../models/project.model'
import { ProjectServices } from '../../services/index'
import { FormGroup, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { EmployeeServices } from 'src/app/Employee/services/employee.service';

import { MessageService, ConfirmEventType, ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';

@Component({
    selector: 'pim-project-list',
    styleUrls: ['./project-list.component.scss'],
    templateUrl: './project-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConfirmationService, MessageService]
})
export class ProjectListComponent implements OnInit {
    keysearch = "";
    status = { index: null, name: "" };
    columnSort = "";
    orderSort = 1;
    statusEnum = Status;
    nameChoose = "Projects List";
    listProject: Project[] = [];
    project: Project
    choosenProject: Project;
    selectedProjects: Project[] = [];
    totalRecords: number = 0;
    @Output() title: EventEmitter<any> = new EventEmitter()

    @ViewChild('searchForm', { static: false }) searchForm: NgForm
    projectForm: FormGroup
    constructor(public projectServices: ProjectServices,
        private employeeServices: EmployeeServices,
        private cdr: ChangeDetectorRef,
        private router: Router,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public translate: TranslateService) {
    }

    ngOnInit() {
        // get all project
        //this.getAllProject();
        this.cdr.markForCheck();
        this.title.emit(this.translate.instant('TitleChooseList'));
    }

    private getAllProject() {
        this.projectServices.getAllProject().subscribe(data => {
            this.listProject = data;
            this.cdr.markForCheck();
        })
    }

    resetForm() {
        this.searchForm.reset();
        this.getAllProject();
    }

    onSubmit(searchForm) {
        this.projectServices.getHaveCondition(searchForm.value.keysearch, searchForm.value.status.name, 1, this.columnSort, this.orderSort).subscribe(data => {
            this.listProject = data;
            this.projectServices.countProjects(this.keysearch, this.status).subscribe(count => {
                this.totalRecords = count;
                this.cdr.markForCheck();
            });
            this.cdr.markForCheck();
        });

    }

    onDeleteProject(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                this.projectServices.getDetailProject(id).subscribe(data => {
                    if (data.Status == 0) {
                        this.projectServices.deleteProject([id]).subscribe(() => {
                            this.getAllProject();
                        });
                        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Project is deleted' });
                    }
                    else {
                        this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Delete failed' });
                    }
                })
            }
        });
    }
    onDeleteProjects() {
        let total = this.selectedProjects.length;
        this.confirmationService.confirm({
            message: 'Are you sure that you want to delete ' + total + ' projects?',
            header: 'Confirmation',
            icon: 'pi pi-info-circle',
            accept: () => {
                let checkDelete = this.selectedProjects.filter(x => x.Status != 0);
                if (checkDelete.length == 0) {
                    let checkedIds = this.selectedProjects.map(x => x.Id);
                    this.projectServices.deleteProject(checkedIds).subscribe(() => {
                        this.getAllProject();
                    });
                    this.selectedProjects = [];
                    this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: total + ' projects are deleted' });
                }
                else {
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'Delete failed' });
                }
            }
        });

    }

    loadProjects(event) {
        let page = event.first / event.rows + 1;
        this.orderSort = event.sortOrder;
        this.columnSort = event.sortField
        this.projectServices.getHaveCondition(this.keysearch, this.status.name, page, this.columnSort, this.orderSort).subscribe(data => {
            this.listProject = data;
            this.projectServices.countProjects(this.keysearch, this.status).subscribe(count => {
                this.totalRecords = count;
                this.cdr.markForCheck();
            });
            this.cdr.markForCheck();
        });
    }
}
