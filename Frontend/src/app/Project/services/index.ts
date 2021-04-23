import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ProjectService } from '../../swagger/services/project.service';
import { Project } from '../models/project.model';
import { map, tap } from 'rxjs/operators'
import { ProjectDto } from 'src/app/swagger/models/project-dto';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProjectServices {
    projectChanged = new Subject<Project[]>();
    private projects: Project[] = [];
    constructor(private projectService: ProjectService) { }

    getAllProject(): Observable<Array<Project>> {
        return this.projectService.ProjectGetAll().pipe(
            map((data) => {
                let listProject: Project[] = [];
                for (let pro of data) {
                    listProject.push(new Project(pro as ProjectDto));
                }
                return listProject;
            }),
            tap(data => {
                this.setProject(data);
            }))
    }
    getAll() {
        return this.projects.slice();
    }
    setProject(projects: Project[])
    {
        this.projects = projects;
        this.projectChanged.next(this.projects.slice());
    }

}