import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Project, Status } from '../../models/project.model'
import { ProjectServices } from '../../services/index'
import { FormGroup, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { EmployeeServices } from 'src/app/Employee/services/employee.service';

import { MessageService, ConfirmationService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'pim-project-list',
    styleUrls: ['./project-list.component.scss'],
    templateUrl: './project-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [ConfirmationService, MessageService]
})
export class ProjectListComponent implements OnInit, OnDestroy {
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
        private cdr: ChangeDetectorRef,
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        public translate: TranslateService,
        private cookieService: CookieService) {
    }

    ngOnInit() {
        // get all project
        //this.getAllProject();
        this.cdr.markForCheck();
        this.title.emit("TitleChooseList");
        this.keysearch = this.cookieService.get('keysearch');
        this.status = { index: +this.cookieService.get('index'), name: this.cookieService.get('status') };
    }

    private getAllProject() {
        this.projectServices.getAllProject().subscribe(data => {
            this.listProject = data;
            this.cdr.markForCheck();
        })
    }

    resetForm() {
        this.keysearch = "";
        this.status = { index: null, name: "" };
        this.onSubmit();
        this.cookieService.deleteAll();
        this.cdr.markForCheck();
    }

    onSubmit() {
        this.projectServices.getHaveCondition(this.keysearch, this.status.name, 1, this.columnSort, this.orderSort).subscribe(data => {
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
            message: this.translate.instant('MCMessDelete') + '?',
            header: this.translate.instant('MCHeader'),
            icon: 'pi pi-info-circle',
            accept: () => {
                this.projectServices.getDetailProject(id).subscribe(data => {
                    if (data.Status == 0) {
                        this.projectServices.deleteProject([id]).subscribe(() => {
                            this.getAllProject();
                        });
                        this.messageService.add({ severity: 'success', summary: this.translate.instant('MCSummarySuccess'), detail: this.translate.instant('MCDetailSuccess') });
                    }
                    else {
                        this.messageService.add({ severity: 'warn', summary: this.translate.instant('MCSummaryWarn'), detail: this.translate.instant('MCDetailWarn') });
                    }
                })
            }
        });
    }
    onDeleteProjects() {
        let total = this.selectedProjects.length;
        this.confirmationService.confirm({
            message: this.translate.instant('MCMessDelete') + ' ' + total + ' ' + this.translate.instant('SummaryTable2'),
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
                    this.messageService.add({ severity: 'success', summary: this.translate.instant('MCSummarySuccess'), detail: total + this.translate.instant('MCDetailSuccess2') });
                }
                else {
                    this.messageService.add({ severity: 'warn', summary: this.translate.instant('MCSummaryWarn'), detail: this.translate.instant('MCDetailWarn') });
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
            this.projectServices.countProjects(this.keysearch, this.status.name).subscribe(count => {
                this.totalRecords = count;
                this.cdr.markForCheck();
            });
            this.cdr.markForCheck();
        });
    }

    checkAll() {

    }

    ngOnDestroy() {
        if (this.keysearch != "" && this.status != null) {
            this.cookieService.set('keysearch', this.keysearch);
            this.cookieService.set('status', this.status.name);
            this.cookieService.set('index', this.status.index.toString());
        }

    }
}
