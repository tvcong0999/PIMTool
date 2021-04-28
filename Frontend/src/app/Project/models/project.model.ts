import { ProjectDto } from "src/app/swagger/models/project-dto"
import { map } from 'rxjs/operators';
export class Project {
    Id: number
    ProjectNumber: number
    Name: string
    Customer: string
    Status: Status
    StartDate: Date
    constructor(projectDto: ProjectDto){
        this.Id = projectDto.Id;
        this.ProjectNumber = projectDto.ProjectNumber;
        this.Name = projectDto.Name;
        this.Customer = projectDto.Customer;
        this.Status = projectDto.Status;
        this.StartDate = new Date(projectDto.StartDate);
    }
}
export enum Status {
    NEW,
    PLA,
    INP,
    FIN
}