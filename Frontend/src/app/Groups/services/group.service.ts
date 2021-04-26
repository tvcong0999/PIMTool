import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GroupDto } from 'src/app/swagger/models';
import { GroupService } from '../../swagger/services/group.service';
@Injectable({
    providedIn: 'root'
})
export class GroupServices {
    constructor(private groupService: GroupService){}
    getAllGroup(): Observable<GroupDto[]>{
        return this.groupService.GroupGetAll();
    }
}