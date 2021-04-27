import { ProjectDto } from "src/app/swagger/models/project-dto"
import { map } from 'rxjs/operators';
export class Project {
    Id: number
    GroupId: number
    ProjectNumber: number
    Name: string
    Customer: string
    Status: Status
    StartDate: Date
    FinishDate: Date
    EmployeeIds: Array<number>
    constructor(projectDto: ProjectDto){
        this.Id = projectDto.Id;
        this.GroupId = projectDto.GroupId
        this.ProjectNumber = projectDto.ProjectNumber;
        this.Name = projectDto.Name;
        this.Customer = projectDto.Customer;
        this.Status = projectDto.Status;
        this.StartDate = new Date(projectDto.StartDate);
        this.FinishDate = new Date(projectDto.FinishDate);
        this.EmployeeIds = projectDto.EmployeeIds.slice();
    }
}
export enum Status {
    NEW,
    PLA,
    INP,
    FIN
}