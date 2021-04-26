import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PIMBaseModule } from '@base';
import { ProjectListComponent } from './components';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectCreateComponent } from './components/project-create/project-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TagInputModule } from 'ngx-chips';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ProjectListComponent, ProjectCreateComponent],
    providers: [],
    imports: [
        CommonModule,
        ProjectRoutingModule,
        PIMBaseModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        TagInputModule,
    ]
})
export class ProjectModule {

}
