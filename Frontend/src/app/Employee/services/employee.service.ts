import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../../swagger/services/employee.service';
@Injectable({
    providedIn: 'root'
})

export class EmployeeServices {
    constructor(private employeeService: EmployeeService){}

    getAllEmployee(value: string){
        return this.employeeService.EmployeeGetByVISAOrName(value).pipe(map(data=>{
            let listVisa: string[] = []
            for(let item of data)
            {
                listVisa.push(item.Visa + ": "+item.LastName + " " + item.LastName);
            }
            return listVisa;
        }));
    }
}