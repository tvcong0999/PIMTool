/* tslint:disable */
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApiConfiguration } from './api-configuration';

import { EmployeeService } from './services/employee.service';
import { GroupService } from './services/group.service';
import { ProjectService } from './services/project.service';
import { SampleService } from './services/sample.service';

/**
 * Provider for all Api services, plus ApiConfiguration
 */
@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [
    ApiConfiguration,
    EmployeeService,
    GroupService,
    ProjectService,
    SampleService
  ],
})
export class ApiModule { }
