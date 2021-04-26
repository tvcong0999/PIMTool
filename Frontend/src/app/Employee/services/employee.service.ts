import { Injectable } from '@angular/core';
import { EmployeeService } from '../../swagger/services/employee.service';
@Injectable({
    providedIn: 'root'
})

export class EmployeeServices {
    constructor(private employeeService: EmployeeService){}

    getAllEmployee(value: string){
        return this.employeeService.EmployeeGetByVISAOrName(value);
    }
}