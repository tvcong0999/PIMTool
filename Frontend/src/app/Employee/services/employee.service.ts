import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { EmployeeService } from '../../swagger/services/employee.service';
@Injectable({
    providedIn: 'root'
})

export class EmployeeServices {
    constructor(private employeeService: EmployeeService) { }
    listEmployee;
    getAllEmployee(value: string) {
        return this.employeeService.EmployeeGetByVISAOrName(value);
    }

    getInforByIds(ids) {
        return this.employeeService.EmployeeGetByIds(ids).pipe(map(data => {
            let employees = [];
            data.forEach(element => {
                employees.push({
                    Id: element.Id,
                    Visa: element.Visa + ": " + element.LastName + " " + element.FirstName,
                    display: element.Visa + ": " + element.LastName + " " + element.FirstName,
                    value: element.Id,
                })
            });
            return employees;
        }));
    }
}