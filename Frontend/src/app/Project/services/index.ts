import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { ProjectService } from '../../swagger/services/project.service';
import { Project } from '../models/project.model';
import { map, tap } from 'rxjs/operators'
import { ProjectDto } from 'src/app/swagger/models/project-dto';
import { Observable, Subject } from 'rxjs';
import { ProjectCreateDto } from 'src/app/swagger/models';
import { ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ProjectServices {
    listProject: Project[] = [];
    constructor(private projectService: ProjectService) { }

    getAllProject(): Observable<Array<Project>> {
        return this.projectService.ProjectGetAll().pipe(
            map((data) => {
                let listProject: Project[] = [];
                for (let pro of data) {
                    listProject.push(new Project(pro as ProjectDto));
                }
                return listProject;
            })
        )
    }
    getHaveCondition(keysearch, status, page): Observable<Array<Project>> {
        return this.projectService.ProjectGetHaveCondition({status:status, page:page, input:keysearch}).pipe(
            map((data) => {
                let listProject: Project[] = [];
                for (let pro of data) {
                    listProject.push(new Project(pro as ProjectDto));
                }
                return listProject;
            })
        )
    }

    deleteProject(ids): Observable<null>
    {
        return this.projectService.ProjectDeleteProject(ids);
    }

    createProject(project): Observable<ProjectCreateDto> {
       return this.projectService.ProjectCreate(project);
    }

    updateProject(project): Observable<null>{
        return this.projectService.ProjectUpdateProject(project);
    }

    validateProjectNumber(proNumber: number): Observable<boolean>
    {
        return this.projectService.ProjectValidateProjectNumber(proNumber);
    }
}